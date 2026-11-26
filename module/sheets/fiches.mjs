import { ATLAS } from "../config.mjs";
import { attaquer, jetSimple } from "../jet.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2, ItemSheetV2 } = foundry.applications.sheets;
const T = "systems/atlas/templates";
const loc = k => game.i18n.localize(k);

/** Une barre de la fiche : valeur, maximum et pourcentage pour la jauge. */
function barre(cle, label, d) {
  const max = d.max || 0;
  return { cle, label, value: d.value, max, pct: max ? Math.round(Math.min(100, Math.max(0, (d.value / max) * 100))) : 0 };
}

/** Ce qui est commun aux fiches d'agent et de monstre : jets, attaques, objets. */
class AtlasActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["atlas", "fiche"],
    form: { submitOnChange: true },
    window: { resizable: true },
    actions: {
      jetCarac: AtlasActorSheet.#jetCarac,
      jetTalent: AtlasActorSheet.#jetTalent,
      jetDomaine: AtlasActorSheet.#jetDomaine,
      attaque: AtlasActorSheet.#attaque,
      attaqueMonstre: AtlasActorSheet.#attaqueMonstre,
      creerObjet: AtlasActorSheet.#creerObjet,
      editerObjet: AtlasActorSheet.#editerObjet,
      supprimerObjet: AtlasActorSheet.#supprimerObjet,
      equiper: AtlasActorSheet.#equiper
    }
  };

  /** Les cases à cocher multiples (réactions, familles) renvoient null quand elles sont décochées. */
  _processFormData(event, form, formData) {
    const data = super._processFormData(event, form, formData);
    for ( const k of ["reactions", "familles"] ) {
      const v = foundry.utils.getProperty(data, `system.${k}`);
      if ( Array.isArray(v) ) foundry.utils.setProperty(data, `system.${k}`, v.filter(x => x));
      else if ( v === null ) foundry.utils.setProperty(data, `system.${k}`, []);
    }
    return data;
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor, s = actor.system;
    const parType = t => actor.items.filter(i => i.type === t).sort((a, b) => a.sort - b.sort);
    Object.assign(context, {
      actor, system: s, config: ATLAS,
      reactions: Object.entries(ATLAS.reactions).map(([k, label]) => ({ k, label, on: s.reactions.has(k) })),
      armes: parType("arme").map(a => ({
        id: a.id, nom: a.name, img: a.img, degats: a.system.degats, bruit: a.system.bruit,
        type: loc(ATLAS.typesDegats[a.system.typeDegats] ?? ""), famille: loc(ATLAS.familles[a.system.famille] ?? ""),
        maitrisee: s.familles?.has(a.system.famille) ?? false, munitions: a.system.munitions
      })),
      armures: parType("armure"),
      objets: parType("objet")
    });
    return context;
  }

  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    if ( context.tabs && (partId in context.tabs) ) context.tab = context.tabs[partId];
    return context;
  }

  static async #jetCarac(event, target) {
    const k = target.dataset.carac;
    return jetSimple(this.actor, { label: loc(ATLAS.caracteristiques[k]), score: this.actor.system.caracs[k] });
  }

  static async #jetTalent(event, target) {
    const k = target.dataset.talent;
    return jetSimple(this.actor, { label: loc(ATLAS.talents[k].label), score: this.actor.system.talents[k].score, cle: `talents.${k}` });
  }

  static async #jetDomaine(event, target) {
    const k = target.dataset.domaine;
    return jetSimple(this.actor, { label: loc(ATLAS.domaines[k]), score: this.actor.system.domaines[k].score, cle: `domaines.${k}` });
  }

  static async #attaque(event, target) {
    const arme = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if ( arme ) return attaquer(this.actor, arme);
  }

  static async #attaqueMonstre() {
    return attaquer(this.actor, null);
  }

  static async #creerObjet(event, target) {
    const type = target.dataset.type;
    const [item] = await this.actor.createEmbeddedDocuments("Item", [{ name: loc(`ATLAS.Nouveau.${type}`), type }]);
    item?.sheet.render(true);
  }

  static #editerObjet(event, target) {
    this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId)?.sheet.render(true);
  }

  static async #supprimerObjet(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if ( item ) await item.deleteDialog();
  }

  static async #equiper(event, target) {
    const item = this.actor.items.get(target.closest("[data-item-id]")?.dataset.itemId);
    if ( item ) await item.update({ "system.equipee": !item.system.equipee });
  }
}

/** La fiche d'agent, en cinq onglets. */
export class AgentSheet extends AtlasActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["agent"],
    position: { width: 780, height: 860 }
  };

  static PARTS = {
    entete: { template: `${T}/agent/entete.hbs` },
    onglets: { template: "templates/generic/tab-navigation.hbs" },
    agent: { template: `${T}/agent/agent.hbs`, scrollable: [""] },
    talents: { template: `${T}/agent/talents.hbs`, scrollable: [""] },
    combat: { template: `${T}/agent/combat.hbs`, scrollable: [""] },
    classe: { template: `${T}/agent/classe.hbs`, scrollable: [""] },
    notes: { template: `${T}/agent/notes.hbs`, scrollable: [""] }
  };

  static TABS = {
    primary: {
      tabs: [{ id: "agent" }, { id: "talents" }, { id: "combat" }, { id: "classe" }, { id: "notes" }],
      labelPrefix: "ATLAS.Onglet",
      initial: "agent"
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const s = this.actor.system;
    Object.assign(context, {
      barres: [
        barre("pv", "ATLAS.PV", s.pv),
        barre("sm", "ATLAS.SM", s.sm),
        barre("endurance", "ATLAS.Endurance", s.endurance)
      ],
      paliers: [25, 50, 75],
      fatigue: [1, 2, 3, 4, 5].map(n => ({ n, on: n <= s.fatigue })),
      caracs: Object.entries(ATLAS.caracteristiques).map(([k, label]) => ({ k, label, valeur: s.caracs[k] })),
      talents: Object.entries(ATLAS.talents).map(([k, t]) => ({
        k, label: t.label, carac: ATLAS.caracteristiques[t.carac], ...s.talents[k]
      })),
      domaines: Object.entries(ATLAS.domaines).map(([k, label]) => ({ k, label, ...s.domaines[k] })),
      familles: Object.entries(ATLAS.familles).map(([k, label]) => ({ k, label, on: s.familles.has(k) })),
      malusFatigue: s.fatigue * 10
    });
    return context;
  }
}

/** La fiche de monstre, sur une seule page. */
export class MonstreSheet extends AtlasActorSheet {
  static DEFAULT_OPTIONS = {
    classes: ["monstre"],
    position: { width: 640, height: 780 }
  };

  static PARTS = {
    fiche: { template: `${T}/monstre.hbs`, scrollable: [""] }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const s = this.actor.system;
    Object.assign(context, {
      barres: [barre("pv", "ATLAS.PV", s.pv), barre("endurance", "ATLAS.Endurance", s.endurance)],
      categories: ATLAS.categories,
      typesDegats: ATLAS.typesDegats,
      portees: ATLAS.portees
    });
    return context;
  }
}

/** La fiche d'objet : arme, armure ou objet. */
export class ObjetSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["atlas", "fiche", "objet"],
    form: { submitOnChange: true },
    position: { width: 520, height: "auto" },
    window: { resizable: true }
  };

  static PARTS = {
    fiche: { template: `${T}/objet.hbs` }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    Object.assign(context, {
      item: this.item, system: this.item.system, config: ATLAS,
      estArme: this.item.type === "arme", estArmure: this.item.type === "armure", estObjet: this.item.type === "objet"
    });
    return context;
  }
}
