import { ATLAS } from "../config.mjs";
import { valeursAgent } from "../regles.mjs";

const { SchemaField, NumberField, StringField, BooleanField, SetField } = foundry.data.fields;

const entier = (initial, min = 0, max = 200) => new NumberField({ required: true, nullable: false, integer: true, initial, min, max });
const jauge = initial => new SchemaField({ value: entier(initial, 0, 999) });
const ligne = () => new SchemaField({ bonus: entier(0, 0, 100), coche: new BooleanField() });

/** Les données d'un agent. Les maximums et les scores sont calculés, jamais saisis. */
export default class AgentData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      caracs: new SchemaField(Object.fromEntries(Object.keys(ATLAS.caracteristiques).map(k => [k, entier(30, 0, 200)]))),
      talents: new SchemaField(Object.fromEntries(Object.keys(ATLAS.talents).map(k => [k, ligne()]))),
      domaines: new SchemaField(Object.fromEntries(Object.keys(ATLAS.domaines).map(k => [k, ligne()]))),
      pv: jauge(20),
      sm: jauge(20),
      endurance: jauge(10),
      fatigue: entier(0, 0, 5),
      chutes: entier(0, 0, 9),
      niveau: entier(1, 1, 20),
      vitesse: entier(30, 0, 300),
      espece: new StringField({ initial: "Humain" }),
      metier: new StringField({ initial: "" }),
      classe: new StringField({ initial: "" }),
      reactions: new SetField(new StringField({ choices: Object.keys(ATLAS.reactions) })),
      familles: new SetField(new StringField({ choices: Object.keys(ATLAS.familles) })),
      bonus: new SchemaField({ pv: entier(0, -100, 500), esquive: entier(0, -100, 100) }),
      dons: new StringField({ initial: "" }),
      techniques: new StringField({ initial: "" }),
      blessures: new StringField({ initial: "" }),
      notes: new StringField({ initial: "" })
    };
  }

  prepareDerivedData() {
    const armures = this.parent.items.filter(i => (i.type === "armure") && i.system.equipee);
    const esquiveEquipement = armures.reduce((t, a) => t + a.system.esquive, 0) + this.bonus.esquive;
    const v = valeursAgent(this.caracs, this.niveau, {
      vitesse: this.vitesse, esquiveEquipement, perception: this.talents.perception.bonus, pvBonus: this.bonus.pv
    });
    this.pv.max = v.pvMax;
    this.sm.max = v.smMax;
    this.endurance.max = v.enduranceMax;
    this.endurance.recuperation = v.recuperation;
    for ( const k of ["pv", "sm", "endurance"] ) this[k].value = Math.min(this[k].value, this[k].max);
    this.esquive = v.esquive;
    this.perceptionPassive = v.perceptionPassive;
    this.maitrise = v.maitrise;
    this.deplacement = { cases: v.cases, metres: v.metres };
    this.armure = armures.reduce((t, a) => t + a.system.valeur.value, 0);

    // Les scores : caractéristique + bonus, c'est la chance en % sur un jet normal.
    for ( const [k, t] of Object.entries(ATLAS.talents) ) this.talents[k].score = this.caracs[t.carac] + this.talents[k].bonus;
    for ( const k of Object.keys(ATLAS.domaines) ) this.domaines[k].score = this.caracs.intelligence + this.domaines[k].bonus;
  }
}
