// Tests des règles chiffrées : node tests/regles.test.mjs
import { valeursAgent, lireJet, formuleJet, degatsSubis, avancerJauge, maitrise, malusFatigue, tempsAvantTour } from "../module/regles.mjs";
let ok = 0, ko = 0;
const eq = (nom, a, b) => { const s = JSON.stringify(a) === JSON.stringify(b); s ? ok++ : ko++; if (!s) console.log("ÉCHEC", nom, JSON.stringify(a), "≠", JSON.stringify(b)); };
// Hugo, l'agent de la fiche
const hugo = { force: 20, agilite: 50, constitution: 40, stamina: 40, intelligence: 50, esprit: 30, presence: 30 };
const v = valeursAgent(hugo, 1, { perception: 10 });
eq("PV Hugo", v.pvMax, 20); eq("SM Hugo", v.smMax, 20); eq("endurance", v.enduranceMax, 10); eq("récup", v.recuperation, 6);
eq("esquive", v.esquive, 100); eq("perception passive", v.perceptionPassive, 90); eq("déplacement", [v.cases, v.metres], [6, 9]); eq("poids", v.poidsMax, 30);
eq("niveau 4 : +5 PV, +3 SM", [valeursAgent(hugo, 4).pvMax, valeursAgent(hugo, 4).smMax], [35, 23]);
eq("maîtrise", [maitrise(1), maitrise(9), maitrise(10), maitrise(20)], [10, 10, 15, 20]);
eq("fatigue", [malusFatigue(0), malusFatigue(2), malusFatigue(9)], [0, -20, -50]);
// Jets
eq("Léa 47 + 70", lireJet(47, 117, 100), { reussi: true, extreme: null });
eq("30 + 70 = 100 raté", lireJet(30, 100, 100), { reussi: false, extreme: null });
eq("catastrophe même au-dessus", lireJet(3, 103, 80), { reussi: false, extreme: "catastrophe" });
eq("critique même en dessous", lireJet(97, 127, 160), { reussi: true, extreme: "critique" });
eq("1 et 100", [lireJet(1, 71, 80).extreme, lireJet(100, 130, 160).extreme], ["superCatastrophe", "superCritique"]);
eq("formules", [formuleJet(70), formuleJet(70, 1), formuleJet(60, -2, -10), formuleJet(50, 5)], ["1d100 + 70", "1d100 + 70 + 1d10", "1d100 + 60 - 2d10 - 10", "1d100 + 50 + 3d10"]);
// Dégâts
eq("pistolet sur la goule", degatsSubis({ degats: 6, armure: 1 }), { pertes: 5, armureUtilisee: 1, armureTraversee: true });
eq("griffes sur Hugo, encaisser", degatsSubis({ degats: 8, armure: 2, encaisser: true }), { pertes: 4, armureUtilisee: 4, armureTraversee: true });
eq("encaisser sans armure", degatsSubis({ degats: 8, armure: 0, encaisser: true, constitution: 40 }).pertes, 4);
eq("super critique", degatsSubis({ degats: 8, armure: 3, superCritique: true }).pertes, 8);
eq("armure qui arrête tout", degatsSubis({ degats: 2, armure: 3 }), { pertes: 0, armureUtilisee: 3, armureTraversee: false });
// Jauge : Hugo 30, goule 40, boss 110, 12 tours (comme le schéma)
let cs = [{ id: "Hugo", jauge: 0, vitesse: 30 }, { id: "Goule", jauge: 0, vitesse: 40 }, { id: "Boss", jauge: 0, vitesse: 110 }], ordre = [], actif = null;
for (let i = 0; i < 12; i++) {
  if (actif) cs.find(c => c.id === actif).jauge -= 100;
  const r = avancerJauge(cs); cs = cs.map(c => ({ ...c, jauge: r.jauges[c.id] })); actif = r.gagnant; ordre.push(actif);
}
eq("ordre des 12 tours", ordre.join(","), "Boss,Goule,Boss,Hugo,Boss,Goule,Boss,Hugo,Boss,Goule,Boss,Hugo");
eq("égalité : le plus rapide", avancerJauge([{ id: "a", jauge: 0, vitesse: 30 }, { id: "b", jauge: 20, vitesse: 10 }]).gagnant, "a");
eq("temps avant tour", [tempsAvantTour(100, 30), tempsAvantTour(20, 30)], [0, 1]);
console.log(`${ok} réussis, ${ko} échoués`);
