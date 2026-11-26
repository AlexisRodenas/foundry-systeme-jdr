import { avancerJauge, tempsAvantTour } from "../regles.mjs";

/**
 * Le combat sans rounds : chaque combattant a une jauge (son « initiative ») qui se remplit de 50 + Vitesse.
 * Celui qui atteint 100 joue ; on lui retire 100 au tour suivant. Chaque tour de jeu compte comme un round
 * pour Foundry, pour que les effets et les annonces de tour marchent.
 */
export class AtlasCombat extends foundry.documents.Combat {

  /** Trier : celui qui joue en premier, puis les suivants dans l'ordre où ils joueront. */
  setupTurns() {
    this.turns ||= [];
    const vitesse = c => c.actor?.vitesse ?? 30;
    const turns = this.combatants.contents.sort((a, b) => {
      const ta = tempsAvantTour(a.initiative, vitesse(a)), tb = tempsAvantTour(b.initiative, vitesse(b));
      if ( Math.abs(ta - tb) > 1e-6 ) return ta - tb;
      return (vitesse(b) - vitesse(a)) || (a.id > b.id ? 1 : -1);
    });
    if ( this.turn !== null ) {
      this.turn = 0;
      turns.forEach((c, i) => c.turnNumber = i);
    }
    this.current = this._getCurrentState(turns[this.turn]);
    if ( !this.previous ) this.previous = { ...this.current };
    return this.turns = turns;
  }

  /** Les combattants qui avancent (sans les vaincus, si l'option est cochée). */
  #enJeu() {
    return this.combatants.filter(c => !(this.settings.skipDefeated && c.isDefeated));
  }

  /** Faire avancer les jauges jusqu'au prochain combattant à 100. */
  async #avancer({ retirerActif = true } = {}) {
    const enJeu = this.#enJeu();
    if ( !enJeu.length ) return;
    const actif = this.combatant;
    const etat = enJeu.map(c => ({
      id: c.id,
      vitesse: c.actor?.vitesse ?? 30,
      jauge: (c.initiative ?? 0) - ((retirerActif && actif && (c.id === actif.id) && (c.initiative >= 100)) ? 100 : 0)
    }));
    const avant = Object.fromEntries(this.combatants.map(c => [c.id, c.initiative ?? 0]));
    const { jauges } = avancerJauge(etat);
    await this.setFlag("atlas", "historique", [...(this.getFlag("atlas", "historique") ?? []).slice(-19), avant]);
    await this.updateEmbeddedDocuments("Combatant", Object.entries(jauges).map(([_id, initiative]) => ({ _id, initiative })), { turnEvents: false });
  }

  /** Commencer : les jauges partent de leur valeur (0 par défaut), puis on avance jusqu'au premier à jouer. */
  async startCombat() {
    const zero = this.combatants.filter(c => c.initiative === null).map(c => ({ _id: c.id, initiative: 0 }));
    if ( zero.length ) await this.updateEmbeddedDocuments("Combatant", zero, { turnEvents: false });
    await this.#avancer({ retirerActif: false });
    return super.startCombat();
  }

  /** Tour suivant : on retire 100 à celui qui vient de jouer, puis on avance les jauges. */
  async nextTurn() {
    if ( this.round === 0 ) return this.startCombat();
    await this.#avancer();
    const updateData = { round: this.round + 1, turn: 0 };
    const updateOptions = { direction: 1, worldTime: { delta: this.getTimeDelta(this.round, this.turn, this.round + 1, 0) } };
    Hooks.callAll("combatTurn", this, updateData, updateOptions);
    await this.update(updateData, updateOptions);
    return this;
  }

  /** Pas de rounds : « round suivant » fait la même chose que « tour suivant ». */
  async nextRound() {
    if ( this.round === 0 ) return super.nextRound();
    return this.nextTurn();
  }

  /** Revenir en arrière : on remet les jauges d'avant. */
  async previousTurn() {
    const historique = this.getFlag("atlas", "historique") ?? [];
    const avant = historique.pop();
    if ( !avant || (this.round <= 1) ) return this;
    const updates = Object.entries(avant).filter(([id]) => this.combatants.has(id)).map(([_id, initiative]) => ({ _id, initiative }));
    await this.updateEmbeddedDocuments("Combatant", updates, { turnEvents: false });
    await this.setFlag("atlas", "historique", historique);
    await this.update({ round: this.round - 1, turn: 0 }, { direction: -1 });
    return this;
  }

  async previousRound() {
    return this.previousTurn();
  }

  /** Pas de jet d'initiative : une jauge qui n'existe pas encore part de 0. */
  async rollInitiative(ids, { updateTurn = true } = {}) {
    ids = typeof ids === "string" ? [ids] : ids;
    const updates = ids.map(id => this.combatants.get(id)).filter(c => c && (c.initiative === null)).map(c => ({ _id: c.id, initiative: 0 }));
    if ( updates.length ) await this.updateEmbeddedDocuments("Combatant", updates);
    return this;
  }

  /** Au début de son tour, le combattant récupère son endurance. */
  async _onStartTurn(combatant, context) {
    await super._onStartTurn(combatant, context);
    if ( context?.skipped ) return;
    await combatant?.actor?.recupererEndurance();
  }
}

/** Un nouveau combattant entre avec une jauge vide. */
export class AtlasCombatant extends foundry.documents.Combatant {
  async _preCreate(data, options, user) {
    const allowed = await super._preCreate(data, options, user);
    if ( allowed === false ) return false;
    if ( (data.initiative === undefined) || (data.initiative === null) ) this.updateSource({ initiative: 0 });
  }
}
