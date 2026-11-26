import { CATEGORIES } from "../regles.mjs";

/** Les valeurs de départ d'une catégorie, au format d'une mise à jour. */
function valeursCategorie(categorie) {
  const c = CATEGORIES[categorie];
  if ( !c ) return null;
  return {
    "system.pv.value": c.pv, "system.pv.max": c.pv,
    "system.esquive": c.esquive, "system.attaque": c.attaque, "system.degats": c.degats,
    "system.endurance.value": c.endurance, "system.endurance.max": c.endurance
  };
}

export default class AtlasActor extends foundry.documents.Actor {

  /** Un nouveau monstre reçoit les valeurs de sa catégorie ; un nouvel agent, son jeton lié. */
  async _preCreate(data, options, user) {
    const allowed = await super._preCreate(data, options, user);
    if ( allowed === false ) return false;
    if ( this.type === "monstre" ) {
      const sys = data.system ?? {};
      if ( sys.pv === undefined ) this.updateSource(valeursCategorie(this.system.categorie));
    }
    if ( this.type === "agent" ) {
      this.updateSource({ "prototypeToken.actorLink": true, "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.FRIENDLY });
    }
  }

  /** Changer la catégorie d'un monstre remplit ses valeurs de départ. */
  async _preUpdate(changed, options, user) {
    const allowed = await super._preUpdate(changed, options, user);
    if ( allowed === false ) return false;
    const cat = foundry.utils.getProperty(changed, "system.categorie");
    if ( (this.type === "monstre") && cat && (cat !== this.system.categorie) ) {
      const v = valeursCategorie(cat);
      if ( v ) foundry.utils.mergeObject(changed, foundry.utils.expandObject(v));
    }
  }

  /** La vitesse qui remplit la jauge de tour. */
  get vitesse() {
    return this.system.vitesse ?? 30;
  }

  /** L'armure actuelle, pour encaisser les coups. */
  get armure() {
    return this.system.armure ?? 0;
  }

  /** Payer de l'endurance. Renvoie false (et prévient) s'il n'y en a pas assez. */
  async payerEndurance(cout, raison) {
    const e = this.system.endurance;
    if ( !e ) return true;
    if ( e.value < cout ) {
      ui.notifications.warn(game.i18n.format("ATLAS.Avis.PasAssezEndurance", { nom: this.name, cout, reste: e.value, raison }));
      return false;
    }
    await this.update({ "system.endurance.value": e.value - cout });
    return true;
  }

  /** Retirer une balle à une arme qui en utilise. */
  async utiliserBalle(arme) {
    const m = arme.system.munitions;
    if ( !m?.max ) return true;
    if ( m.value < 1 ) {
      ui.notifications.warn(game.i18n.format("ATLAS.Avis.PlusDeBalles", { arme: arme.name }));
      return false;
    }
    await arme.update({ "system.munitions.value": m.value - 1 });
    return true;
  }

  /** L'endurance qui revient au début de son tour, moins la fatigue. */
  async recupererEndurance() {
    const e = this.system.endurance;
    if ( !e ) return;
    const gain = Math.max(0, (e.recuperation ?? this.system.recuperation ?? 0) - (this.system.fatigue ?? 0));
    const valeur = Math.min(e.max, e.value + gain);
    if ( valeur !== e.value ) await this.update({ "system.endurance.value": valeur });
  }
}
