/**
 * A.T.L.A.S. — Autorité de Traitement et de Localisation des Anomalies Surnaturelles.
 * Point d'entrée du système pour Foundry VTT v14. Étape 1 : jouable.
 */
import { ATLAS } from "./config.mjs";
import * as regles from "./regles.mjs";
import AgentData from "./data/agent.mjs";
import MonstreData from "./data/monstre.mjs";
import { ArmeData, ArmureData, ObjetData } from "./data/objets.mjs";
import AtlasActor from "./documents/actor.mjs";
import { AtlasCombat, AtlasCombatant } from "./documents/combat.mjs";
import AtlasToken from "./canvas/token.mjs";
import { AgentSheet, MonstreSheet, ObjetSheet } from "./sheets/fiches.mjs";
import { attaquer, jetSimple } from "./jet.mjs";
import { brancherChat } from "./chat.mjs";

Hooks.once("init", () => {
  console.log("A.T.L.A.S. | Initialisation");
  CONFIG.ATLAS = ATLAS;

  // Documents et données
  CONFIG.Actor.documentClass = AtlasActor;
  CONFIG.Actor.dataModels = { agent: AgentData, monstre: MonstreData };
  CONFIG.Item.dataModels = { arme: ArmeData, armure: ArmureData, objet: ObjetData };
  CONFIG.Combat.documentClass = AtlasCombat;
  CONFIG.Combatant.documentClass = AtlasCombatant;
  CONFIG.Token.objectClass = AtlasToken;

  // Les barres qu'on peut mettre sur un jeton
  CONFIG.Actor.trackableAttributes = {
    agent: { bar: ["pv", "sm", "endurance"], value: ["fatigue", "chutes", "niveau"] },
    monstre: { bar: ["pv", "endurance"], value: ["armure"] }
  };

  // Les fiches
  const { Actors, Items } = foundry.documents.collections;
  Actors.registerSheet("atlas", AgentSheet, { types: ["agent"], makeDefault: true, label: "ATLAS.Fiche.agent" });
  Actors.registerSheet("atlas", MonstreSheet, { types: ["monstre"], makeDefault: true, label: "ATLAS.Fiche.monstre" });
  Items.registerSheet("atlas", ObjetSheet, { types: ["arme", "armure", "objet"], makeDefault: true, label: "ATLAS.Fiche.objet" });

  // Les cartes du chat
  brancherChat();

  // Pour les macros : game.atlas.jetSimple(acteur, {label, score}), game.atlas.attaquer(acteur, arme)
  game.atlas = { regles, jetSimple, attaquer };
});
