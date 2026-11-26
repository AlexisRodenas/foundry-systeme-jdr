import { ATLAS } from "../config.mjs";

const { SchemaField, NumberField, StringField, BooleanField } = foundry.data.fields;

const entier = (initial, min = 0, max = 999) => new NumberField({ required: true, nullable: false, integer: true, initial, min, max });

/** Une arme : son dé, sa famille, son bruit et ses balles. */
export class ArmeData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      famille: new StringField({ required: true, initial: "lames", choices: Object.keys(ATLAS.familles) }),
      portee: new StringField({ required: true, initial: "melee", choices: Object.keys(ATLAS.portees) }),
      degats: new StringField({ initial: "1d6" }),
      typeDegats: new StringField({ initial: "tranchant", choices: Object.keys(ATLAS.typesDegats) }),
      bruit: entier(0, 0, 5),
      munitions: new SchemaField({ value: entier(0), max: entier(0) }),
      description: new StringField({ initial: "" })
    };
  }
}

/** Une armure ou un bouclier : ce qu'il retire à chaque coup, et ce qu'il change à l'Esquive. */
export class ArmureData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      valeur: new SchemaField({ value: entier(2), max: entier(2) }),
      esquive: entier(0, -50, 50),
      equipee: new BooleanField({ initial: true }),
      description: new StringField({ initial: "" })
    };
  }
}

/** Tout le reste : trousse, lampe, chargeur… */
export class ObjetData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      quantite: entier(1),
      description: new StringField({ initial: "" })
    };
  }
}
