/**
 * Les règles chiffrées d'A.T.L.A.S., sans dépendance à Foundry.
 * Chaque fonction reprend une règle de docs/regles.md ; on peut les tester avec Node.
 */

/** Difficultés : le total du jet doit dépasser ce seuil. */
export const DIFFICULTES = {
  facile: 80,
  normal: 100,
  dur: 120,
  tresDur: 140,
  presqueImpossible: 160
};

/** Coût en endurance des attaques. */
export const COUTS_ATTAQUE = { legere: 2, normale: 3, lourde: 5 };

/** Coût en endurance des réactions. */
export const COUTS_REACTION = { eviter: 2, parer: 3, encaisser: 2 };

/** Valeurs de départ des cinq catégories de monstres. */
export const CATEGORIES = {
  I: { pv: 15, esquive: 80, attaque: 40, degats: "1d8", endurance: 8 },
  II: { pv: 35, esquive: 90, attaque: 55, degats: "2d6", endurance: 10 },
  III: { pv: 70, esquive: 100, attaque: 70, degats: "2d8", endurance: 12 },
  IV: { pv: 120, esquive: 110, attaque: 85, degats: "3d8", endurance: 14 },
  V: { pv: 200, esquive: 120, attaque: 100, degats: "4d8", endurance: 16 }
};

const bas = (n, d) => Math.floor(n / d);

/** Maîtrise d'une famille d'armes : +10, +15 au niveau 10, +20 au niveau 20. */
export function maitrise(niveau) {
  if ( niveau >= 20 ) return 20;
  if ( niveau >= 10 ) return 15;
  return 10;
}

/**
 * Les valeurs calculées d'un agent.
 * @param {object} c       Les caractéristiques (force, agilite, constitution, stamina, intelligence, esprit, presence)
 * @param {number} niveau  De 1 à 20
 * @param {object} [extra] vitesse, bonus d'Esquive de l'équipement, bonus de Perception
 */
export function valeursAgent(c, niveau, { vitesse = 30, esquiveEquipement = 0, perception = 0, pvBonus = 0 } = {}) {
  const n = Math.max(1, niveau) - 1;
  return {
    pvMax: 12 + bas(c.constitution, 5) + n * (3 + bas(c.constitution, 20)) + pvBonus,
    smMax: 5 + bas(c.esprit, 2) + n,
    enduranceMax: 6 + bas(c.stamina, 10),
    recuperation: 4 + bas(c.stamina, 20),
    esquive: 50 + c.agilite + esquiveEquipement,
    perceptionPassive: 50 + c.esprit + perception,
    maitrise: maitrise(niveau),
    cases: bas(vitesse, 5),
    metres: bas(vitesse, 5) * 1.5,
    poidsMax: 10 + bas(c.stamina, 2)
  };
}

/** Ce que la fatigue retire à chaque jet : 10 par cran. */
export function malusFatigue(fatigue) {
  return -10 * Math.max(0, Math.min(5, fatigue || 0));
}

/**
 * Lire le résultat d'un jet.
 * @param {number} d100   Le résultat du d100 seul
 * @param {number} total  Le total du jet
 * @param {number} seuil  Le seuil à dépasser
 * @returns {{reussi: boolean, extreme: string|null}}
 *   extreme vaut "superCatastrophe" (1), "catastrophe" (2 à 5), "critique" (96 à 99), "superCritique" (100) ou null.
 */
export function lireJet(d100, total, seuil) {
  let extreme = null;
  if ( d100 === 1 ) extreme = "superCatastrophe";
  else if ( d100 <= 5 ) extreme = "catastrophe";
  else if ( d100 === 100 ) extreme = "superCritique";
  else if ( d100 >= 96 ) extreme = "critique";
  let reussi = total > seuil;
  if ( (extreme === "critique") || (extreme === "superCritique") ) reussi = true;
  if ( (extreme === "catastrophe") || (extreme === "superCatastrophe") ) reussi = false;
  return { reussi, extreme };
}

/**
 * La formule d'un jet : 1d100 + score, plus ou moins des d10 (trois au plus).
 * @param {number} score       Caractéristique + talent (ou bonus d'attaque)
 * @param {number} avantages   Positif : avantages ; négatif : désavantages
 * @param {number} [modif]     Modificateur libre, fatigue comprise
 */
export function formuleJet(score, avantages = 0, modif = 0) {
  const n = Math.max(-3, Math.min(3, Math.trunc(avantages) || 0));
  let f = `1d100 + ${score}`;
  if ( n > 0 ) f += ` + ${n}d10`;
  if ( n < 0 ) f += ` - ${-n}d10`;
  if ( modif > 0 ) f += ` + ${modif}`;
  if ( modif < 0 ) f += ` - ${-modif}`;
  return f;
}

/**
 * Les dégâts réellement subis.
 * @param {object} o
 * @param {number} o.degats          Le total des dés de dégâts
 * @param {number} o.armure          L'armure de la cible
 * @param {boolean} [o.encaisser]    La cible encaisse : l'armure compte double
 * @param {number} [o.constitution]  Sans armure, encaisser retire Constitution ÷ 10
 * @param {boolean} [o.superCritique] L'armure ne compte pas
 * @returns {{pertes: number, armureUtilisee: number, armureTraversee: boolean}}
 */
export function degatsSubis({ degats, armure = 0, encaisser = false, constitution = 0, superCritique = false }) {
  let protection = superCritique ? 0 : armure;
  if ( encaisser && !superCritique ) protection = armure > 0 ? armure * 2 : bas(constitution, 10);
  const pertes = Math.max(0, degats - protection);
  return { pertes, armureUtilisee: protection, armureTraversee: (armure > 0) && (pertes > 0) };
}

/**
 * La jauge de tour : chaque jauge se remplit de 50 + Vitesse ; à 100, on joue.
 * À égalité, le plus rapide joue d'abord.
 * @param {{id: string, jauge: number, vitesse: number}[]} combattants
 * @returns {{gagnant: string|null, jauges: Record<string, number>}}
 *   Les jauges après avancement : le gagnant est à 100 (on lui retire 100 au tour suivant).
 */
export function avancerJauge(combattants) {
  if ( !combattants.length ) return { gagnant: null, jauges: {} };
  const vitesse = c => 50 + Math.max(0, c.vitesse || 0);
  const temps = combattants.map(c => Math.max(0, 100 - (c.jauge || 0)) / vitesse(c));
  const m = Math.min(...temps);
  // Égalité : à un demi-point de jauge près, pour ne pas dépendre des arrondis.
  let gagnant = null;
  combattants.forEach((c, i) => {
    if ( ((temps[i] - m) * vitesse(c)) > 0.5 ) return;
    if ( !gagnant || (c.vitesse > gagnant.vitesse) ) gagnant = c;
  });
  const jauges = {};
  for ( const c of combattants ) jauges[c.id] = Math.round(((c.jauge || 0) + (vitesse(c) * m)) * 100) / 100;
  jauges[gagnant.id] = Math.max(100, jauges[gagnant.id]);
  return { gagnant: gagnant.id, jauges };
}

/** Le temps qu'il faut à une jauge pour atteindre 100 (pour trier le suivi de combat). */
export function tempsAvantTour(jauge, vitesse) {
  return Math.max(0, 100 - (jauge || 0)) / (50 + Math.max(0, vitesse || 0));
}
