import { COUTS_REACTION, degatsSubis, formuleJet, lireJet } from "./regles.mjs";

const { renderTemplate } = foundry.applications.handlebars;
const loc = k => game.i18n.localize(k);
const fmt = (k, d) => game.i18n.format(k, d);
const nom = d => foundry.utils.escapeHTML(d.name);

/** Brancher les boutons des cartes d'attaque dans le chat. */
export function brancherChat() {
  Hooks.on("renderChatMessageHTML", (message, html) => {
    const data = message.getFlag("atlas", "attaque");
    if ( !data ) return;
    for ( const bouton of html.querySelectorAll("[data-atlas]") ) {
      bouton.addEventListener("click", event => {
        event.preventDefault();
        surBouton(bouton.dataset.atlas, data).catch(err => {
          console.error(err);
          ui.notifications.error(err.message);
        });
      });
    }
  });
}

/** Un message court dans le chat, au nom de la cible. */
async function annoncer(actor, texte, rolls = []) {
  const content = await renderTemplate("systems/atlas/templates/chat/annonce.hbs", { texte });
  return foundry.documents.ChatMessage.create({
    speaker: foundry.documents.ChatMessage.getSpeaker({ actor }), content, rolls
  });
}

async function surBouton(action, data) {
  const cible = data.cible ? fromUuidSync(data.cible)?.actor : null;
  if ( !cible ) return ui.notifications.warn(loc("ATLAS.Avis.CibleIntrouvable"));
  if ( !cible.isOwner ) return ui.notifications.warn(fmt("ATLAS.Avis.PasProprietaire", { nom: cible.name }));

  switch ( action ) {
    case "degats":
      return appliquerDegats(cible, data, { encaisser: false });

    case "encaisser":
      if ( !(await cible.payerEndurance(COUTS_REACTION.encaisser, loc("ATLAS.Reaction.encaisser"))) ) return;
      return appliquerDegats(cible, data, { encaisser: true });

    // Éviter : +10 en Esquive contre ce coup. S'il ne la dépasse plus, il rate.
    case "eviter": {
      if ( !(await cible.payerEndurance(COUTS_REACTION.eviter, loc("ATLAS.Reaction.eviter"))) ) return;
      const nouvelle = (data.esquive ?? 0) + 10;
      const evite = data.total <= nouvelle;
      return annoncer(cible, fmt(evite ? "ATLAS.Chat.Evite" : "ATLAS.Chat.EviteRate", { nom: nom(cible), total: data.total, esquive: nouvelle }));
    }

    // Parer : 1d100 + Force ou Agilité + maîtrise ; plus haut que le jet de l'attaquant, le coup est paré.
    case "parer": {
      if ( !(await cible.payerEndurance(COUTS_REACTION.parer, loc("ATLAS.Reaction.parer"))) ) return;
      const s = cible.system;
      const score = cible.type === "agent" ? Math.max(s.caracs.force, s.caracs.agilite) + s.maitrise : s.attaque;
      const roll = await new foundry.dice.Roll(formuleJet(score)).evaluate();
      const r = lireJet(roll.dice[0].total, roll.total, data.total);
      return annoncer(cible, fmt(r.reussi ? "ATLAS.Chat.Pare" : "ATLAS.Chat.PareRate", { nom: nom(cible), total: roll.total, attaque: data.total }), [roll]);
    }
  }
}

/** Retirer les PV : dégâts moins l'armure (double en encaissant, ignorée sur un super critique). */
async function appliquerDegats(cible, data, { encaisser }) {
  const s = cible.system;
  const armure = cible.armure;
  const r = degatsSubis({
    degats: data.degats, armure, encaisser,
    constitution: s.caracs?.constitution ?? 0, superCritique: data.superCritique
  });
  const avant = s.pv.value;
  const apres = Math.max(0, avant - r.pertes);
  await cible.update({ "system.pv.value": apres });

  // Une armure traversée perd 1.
  let usure = "";
  if ( r.armureTraversee && !data.superCritique ) {
    if ( cible.type === "agent" ) {
      const piece = cible.items.find(i => (i.type === "armure") && i.system.equipee && (i.system.valeur.value > 0));
      if ( piece ) {
        await piece.update({ "system.valeur.value": piece.system.valeur.value - 1 });
        usure = fmt("ATLAS.Chat.ArmureUsee", { armure: nom(piece), valeur: piece.system.valeur.value });
      }
    }
    else {
      await cible.update({ "system.armure": Math.max(0, s.armure - 1) });
      usure = fmt("ATLAS.Chat.ArmureUsee", { armure: loc("ATLAS.Armure"), valeur: Math.max(0, s.armure) });
    }
  }

  const lignes = [fmt("ATLAS.Chat.Degats", { nom: nom(cible), pertes: r.pertes, avant, apres, armure: r.armureUtilisee })];
  if ( usure ) lignes.push(usure);
  if ( r.pertes * 3 >= s.pv.max && r.pertes > 0 && !data.critique ) lignes.push(loc("ATLAS.Chat.Tiers"));
  if ( apres === 0 ) lignes.push(fmt("ATLAS.Chat.ZeroPV", { nom: nom(cible) }));
  return annoncer(cible, lignes.join("<br>"));
}
