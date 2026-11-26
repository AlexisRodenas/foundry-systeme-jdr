import { ATLAS } from "./config.mjs";
import { DIFFICULTES, COUTS_ATTAQUE, formuleJet, lireJet, malusFatigue } from "./regles.mjs";

const { renderTemplate } = foundry.applications.handlebars;
const { DialogV2 } = foundry.applications.api;
const loc = k => game.i18n.localize(k);

/** Les textes et la couleur d'un résultat. */
function verdict({ reussi, extreme }, { attaque = false, cible = true } = {}) {
  const cle = extreme ?? (reussi ? "reussi" : "rate");
  let texte = loc(`ATLAS.Resultat.${cle}`);
  if ( attaque && !extreme && cible ) texte = loc(reussi ? "ATLAS.Resultat.touche" : "ATLAS.Resultat.manque");
  const classe = extreme ?? (reussi ? "reussi" : "rate");
  return { texte, classe };
}

/** Le détail des dés : le d100, puis les d10 d'avantage ou de désavantage. */
function detailDes(roll) {
  const [d100, ...autres] = roll.dice;
  return {
    d100: d100.total,
    d10: autres.flatMap(d => d.results.map(r => r.result))
  };
}

/**
 * La petite fenêtre avant un jet : difficulté (ou type d'attaque), avantages, modificateur.
 * @returns {Promise<object|null>} Les choix, ou null si on ferme la fenêtre.
 */
export async function fenetreJet({ titre, score, actor, attaque = false, cible = null }) {
  const fatigue = malusFatigue(actor?.system?.fatigue ?? 0);
  const content = await renderTemplate("systems/atlas/templates/fenetre-jet.hbs", {
    score, attaque, fatigue, cible,
    difficultes: ATLAS.difficultes, attaques: ATLAS.attaques
  });
  return DialogV2.input({
    window: { title: titre, icon: "fa-solid fa-dice-d20" },
    classes: ["atlas", "atlas-fenetre"],
    content,
    ok: { label: "ATLAS.Jet.Lancer", icon: "fa-solid fa-dice" }
  });
}

/**
 * Un jet de caractéristique, de talent ou de domaine : 1d100 + score, il faut dépasser la difficulté.
 * Un talent ou un domaine réussi est coché (une fois par mission).
 * @param {Actor} actor
 * @param {object} o
 * @param {string} o.label   Ce qu'on lance, déjà traduit
 * @param {number} o.score   Caractéristique + bonus
 * @param {string} [o.cle]   « talents.discretion » ou « domaines.biologie », pour cocher
 */
export async function jetSimple(actor, { label, score, cle = null }) {
  const choix = await fenetreJet({ titre: label, score, actor });
  if ( !choix ) return null;
  const modif = (choix.modif || 0) + malusFatigue(actor.system.fatigue ?? 0);
  const roll = await new foundry.dice.Roll(formuleJet(score, choix.avantages, modif)).evaluate();
  const seuil = DIFFICULTES[choix.difficulte] ?? 100;
  const { d100, d10 } = detailDes(roll);
  const resultat = lireJet(d100, roll.total, seuil);
  const v = verdict(resultat);

  let coche = false;
  if ( resultat.reussi && cle && !foundry.utils.getProperty(actor.system, `${cle}.coche`) ) {
    await actor.update({ [`system.${cle}.coche`]: true });
    coche = true;
  }

  const content = await renderTemplate("systems/atlas/templates/chat/jet.hbs", {
    label, score, seuil, total: roll.total, d100, d10, modif,
    difficulte: loc(ATLAS.difficultes[choix.difficulte] ?? "ATLAS.Difficulte.normal"),
    verdict: v, coche
  });
  return foundry.documents.ChatMessage.create({
    speaker: foundry.documents.ChatMessage.getSpeaker({ actor }),
    content, rolls: [roll], sound: CONFIG.sounds.dice
  });
}

/**
 * Une attaque, avec une arme ou l'attaque d'un monstre, contre la cible visée.
 * 1d100 + Force (mêlée) ou Agilité (tir) + maîtrise, contre l'Esquive de la cible.
 * @param {Actor} actor
 * @param {Item|null} arme  Null pour l'attaque principale d'un monstre
 */
export async function attaquer(actor, arme = null) {
  const sys = actor.system;
  const melee = (arme ? arme.system.portee : sys.portee) === "melee";
  let score;
  if ( actor.type === "agent" ) {
    const carac = melee ? sys.caracs.force : sys.caracs.agilite;
    const maitrise = arme && sys.familles.has(arme.system.famille) ? sys.maitrise : 0;
    score = carac + maitrise;
  }
  else score = sys.attaque;

  const jeton = game.user.targets.first() ?? null;
  const cible = jeton?.actor ?? null;
  const esquive = cible?.system?.esquive ?? null;
  const nomArme = arme?.name ?? loc("ATLAS.Monstre.attaque");
  const choix = await fenetreJet({
    titre: game.i18n.format("ATLAS.Jet.TitreAttaque", { arme: nomArme }), score, actor, attaque: true,
    cible: cible ? { nom: jeton.name, esquive } : null
  });
  if ( !choix ) return null;

  // Payer : une balle si l'arme en utilise, puis l'endurance.
  const typeAttaque = choix.typeAttaque in COUTS_ATTAQUE ? choix.typeAttaque : "normale";
  const cout = COUTS_ATTAQUE[typeAttaque];
  if ( arme?.system.munitions?.max && (arme.system.munitions.value < 1) ) {
    ui.notifications.warn(game.i18n.format("ATLAS.Avis.PlusDeBalles", { arme: arme.name }));
    return null;
  }
  if ( !(await actor.payerEndurance(cout, nomArme)) ) return null;
  if ( arme ) await actor.utiliserBalle(arme);

  // Le jet d'attaque.
  const modif = (choix.modif || 0) + malusFatigue(sys.fatigue ?? 0);
  const roll = await new foundry.dice.Roll(formuleJet(score, choix.avantages, modif)).evaluate();
  const { d100, d10 } = detailDes(roll);
  const resultat = lireJet(d100, roll.total, esquive ?? 0);
  const touche = (esquive === null) ? null : resultat.reussi;
  const critique = ["critique", "superCritique"].includes(resultat.extreme);
  const superCritique = resultat.extreme === "superCritique";
  const catastrophe = ["catastrophe", "superCatastrophe"].includes(resultat.extreme);

  // Les dégâts : le dé de l'arme, + Force ÷ 10 au corps à corps ; un critique double les dés.
  const rolls = [roll];
  let degats = null, formuleDegats = arme ? arme.system.degats : sys.degats;
  if ( (touche !== false) && !catastrophe && formuleDegats ) {
    if ( melee && (actor.type === "agent") ) formuleDegats += ` + ${Math.floor(sys.caracs.force / 10)}`;
    let rollDegats = new foundry.dice.Roll(formuleDegats);
    if ( critique ) rollDegats = rollDegats.alter(2, 0);
    await rollDegats.evaluate();
    degats = rollDegats.total;
    formuleDegats = rollDegats.formula;
    rolls.push(rollDegats);
  }

  const typeDegats = arme ? arme.system.typeDegats : sys.typeDegats;
  const reactionsCible = cible ? Array.from(cible.system.reactions ?? []) : [];
  const v = cible ? verdict(resultat, { attaque: true }) : { texte: loc("ATLAS.Resultat.sansCible"), classe: resultat.extreme ?? "neutre" };
  const flags = {
    attaque: {
      attaquant: actor.uuid, cible: jeton?.document?.uuid ?? null, nomCible: jeton?.name ?? null,
      total: roll.total, esquive, touche, critique, superCritique, degats, typeDegats, melee
    }
  };
  const content = await renderTemplate("systems/atlas/templates/chat/attaque.hbs", {
    arme: nomArme, typeAttaque: loc(ATLAS.attaques[typeAttaque]), cout,
    cible: jeton?.name ?? null, esquive, score, total: roll.total, d100, d10, modif,
    verdict: v, critique, superCritique, catastrophe, degats, formuleDegats,
    typeDegats: loc(ATLAS.typesDegats[typeDegats] ?? ""),
    boutons: !!(touche && cible && (degats !== null)),
    reactions: {
      eviter: reactionsCible.includes("eviter"),
      parer: reactionsCible.includes("parer") && melee,
      encaisser: reactionsCible.includes("encaisser")
    },
    bruit: arme?.system.bruit ?? null
  });
  return foundry.documents.ChatMessage.create({
    speaker: foundry.documents.ChatMessage.getSpeaker({ actor }),
    content, rolls, flags: { atlas: flags }, sound: CONFIG.sounds.dice
  });
}
