/** Les listes du système : clés techniques et libellés (clés de traduction). */
export const ATLAS = {};

ATLAS.caracteristiques = {
  force: "ATLAS.Carac.force",
  agilite: "ATLAS.Carac.agilite",
  constitution: "ATLAS.Carac.constitution",
  stamina: "ATLAS.Carac.stamina",
  intelligence: "ATLAS.Carac.intelligence",
  esprit: "ATLAS.Carac.esprit",
  presence: "ATLAS.Carac.presence"
};

/** Les talents et leur caractéristique par défaut. */
ATLAS.talents = {
  athletisme: { label: "ATLAS.Talent.athletisme", carac: "force" },
  discretion: { label: "ATLAS.Talent.discretion", carac: "agilite" },
  adresse: { label: "ATLAS.Talent.adresse", carac: "agilite" },
  acrobatie: { label: "ATLAS.Talent.acrobatie", carac: "agilite" },
  investigation: { label: "ATLAS.Talent.investigation", carac: "intelligence" },
  perception: { label: "ATLAS.Talent.perception", carac: "esprit" },
  instinct: { label: "ATLAS.Talent.instinct", carac: "esprit" },
  survie: { label: "ATLAS.Talent.survie", carac: "esprit" },
  persuasion: { label: "ATLAS.Talent.persuasion", carac: "presence" },
  tromperie: { label: "ATLAS.Talent.tromperie", carac: "presence" }
};

/** Les six domaines de Sciences, tous sur l'Intelligence. */
ATLAS.domaines = {
  biologie: "ATLAS.Domaine.biologie",
  chimie: "ATLAS.Domaine.chimie",
  physique: "ATLAS.Domaine.physique",
  mecanique: "ATLAS.Domaine.mecanique",
  electronique: "ATLAS.Domaine.electronique",
  informatique: "ATLAS.Domaine.informatique"
};

ATLAS.difficultes = {
  facile: "ATLAS.Difficulte.facile",
  normal: "ATLAS.Difficulte.normal",
  dur: "ATLAS.Difficulte.dur",
  tresDur: "ATLAS.Difficulte.tresDur",
  presqueImpossible: "ATLAS.Difficulte.presqueImpossible"
};

ATLAS.familles = {
  lames: "ATLAS.Famille.lames",
  contondantes: "ATLAS.Famille.contondantes",
  poing: "ATLAS.Famille.poing",
  epaule: "ATLAS.Famille.epaule",
  lourdes: "ATLAS.Famille.lourdes",
  jet: "ATLAS.Famille.jet"
};

ATLAS.portees = {
  melee: "ATLAS.Portee.melee",
  distance: "ATLAS.Portee.distance"
};

ATLAS.typesDegats = {
  perforant: "ATLAS.Degats.perforant",
  tranchant: "ATLAS.Degats.tranchant",
  contondant: "ATLAS.Degats.contondant",
  feu: "ATLAS.Degats.feu",
  froid: "ATLAS.Degats.froid",
  electrique: "ATLAS.Degats.electrique",
  acide: "ATLAS.Degats.acide",
  toxique: "ATLAS.Degats.toxique",
  radiation: "ATLAS.Degats.radiation",
  sonique: "ATLAS.Degats.sonique",
  necrose: "ATLAS.Degats.necrose",
  mental: "ATLAS.Degats.mental"
};

ATLAS.reactions = {
  eviter: "ATLAS.Reaction.eviter",
  parer: "ATLAS.Reaction.parer",
  encaisser: "ATLAS.Reaction.encaisser"
};

ATLAS.attaques = {
  legere: "ATLAS.Attaque.legere",
  normale: "ATLAS.Attaque.normale",
  lourde: "ATLAS.Attaque.lourde"
};

ATLAS.categories = { I: "I", II: "II", III: "III", IV: "IV", V: "V" };
