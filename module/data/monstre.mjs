import { ATLAS } from "../config.mjs";

const { SchemaField, NumberField, StringField, SetField } = foundry.data.fields;

const entier = (initial, min = 0, max = 999) => new NumberField({ required: true, nullable: false, integer: true, initial, min, max });

/**
 * Les données d'un monstre ou d'un ennemi humain. Choisir une catégorie remplit les valeurs de départ
 * (voir AtlasActor) ; on peut ensuite tout changer à la main.
 */
export default class MonstreData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      categorie: new StringField({ required: true, initial: "I", choices: Object.keys(ATLAS.categories) }),
      pv: new SchemaField({ value: entier(15), max: entier(15) }),
      endurance: new SchemaField({ value: entier(8), max: entier(8) }),
      recuperation: entier(6),
      esquive: entier(80),
      armure: entier(0),
      attaque: entier(40),
      degats: new StringField({ initial: "1d8" }),
      typeDegats: new StringField({ initial: "tranchant", choices: Object.keys(ATLAS.typesDegats) }),
      portee: new StringField({ initial: "melee", choices: Object.keys(ATLAS.portees) }),
      vitesse: entier(30, 0, 300),
      vue: new StringField({ initial: "" }),
      reactions: new SetField(new StringField({ choices: Object.keys(ATLAS.reactions) })),
      resistances: new StringField({ initial: "" }),
      faiblesses: new StringField({ initial: "" }),
      briques: new StringField({ initial: "" }),
      notes: new StringField({ initial: "" })
    };
  }

  prepareDerivedData() {
    this.pv.value = Math.min(this.pv.value, this.pv.max);
    this.endurance.value = Math.min(this.endurance.value, this.endurance.max);
    this.maitrise = 0;
  }
}
