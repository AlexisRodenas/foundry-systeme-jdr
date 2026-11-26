# Points à voir

> Propositions à trancher avant de continuer. Rien n'est décidé ici. Le texte vient de la page de vote et s'adresse à l'auteur du système.

## 1. Le nom

Les règles sont finies : il faut un vrai nom avant de créer le système dans Foundry. J'ai cherché ces noms : aucun jeu de rôle ne s'appelle « Fêlures » ni « Seuil » ; « Au-delà » est le titre d'un jeu vidéo sur Steam. J'ai écarté « Brèche » : le jeu de rôle « À travers la Brèche » existe déjà.

**Exemples**

- Dans Foundry, en créant un monde : « Système de jeu : Fêlures ».
- Sur la fiche de Hugo, en haut : « Fêlures · Hugo, Traqueur niveau 1 ».
- Dans le chat, après un jet : « Fêlures · Biologie, jet dur : réussi ».
- Sur GitHub, le dépôt pourra garder son nom actuel ; seul le système change de nom.

### Quel nom pour le système ?

| Option | Comment ça marche | Vu dans |
| --- | --- | --- |
| Fêlures (conseillé) | D'après les fêlures de la santé mentale, la règle la plus à toi. Dit tout de suite que c'est de l'horreur, et que les agents s'abîment. *« On fait une partie de Fêlures ce soir ? »* |  |
| Au-delà | Deux sens : dépasser 100 sur le dé, et ce qui vient d'ailleurs. Un jeu vidéo porte déjà ce titre, mais pas de jeu de rôle. *« Jet d'Au-delà : 64 + 70 = 134. »* |  |
| Seuil | Le seuil de 100 à dépasser, et le seuil entre notre monde et le reste. Court, mais on pense aussi à l'éditeur de livres du même nom. *« Seuil, le jeu où il faut passer la barre. »* |  |
| Un nom à toi | Écris-le dans la note sous les options. Je vérifierai qu'aucun jeu connu ne le porte avant de l'utiliser. *Le système prendra ton nom partout : Foundry, fiche, chat et dépôt.* |  |

## 2. La licence

Le dépôt est public. La licence dit ce que les autres ont le droit d'en faire. On en choisit deux : une pour le texte des règles, une pour le code Foundry. Ce sont des licences standard ; je ne suis pas juriste.

**Exemples**

- Un joueur recopie ta table du corps sur son blog en te citant : permis avec les deux licences CC.
- Un éditeur veut vendre un PDF qui reprend tes règles : seulement avec CC BY, ou s'il te demande.
- Un développeur reprend ta fiche de Foundry pour son propre système : permis avec MIT.
- Sans licence, tout reste lisible sur GitHub, mais personne n'a le droit de le reprendre.

### Pour le texte des règles

| Option | Comment ça marche | Vu dans |
| --- | --- | --- |
| CC BY-NC-SA 4.0 (conseillé) | Libre pour jouer, partager et adapter, en te citant, sans le vendre. Les versions modifiées gardent la même licence. *Un fan publie gratuitement sa variante avec d'autres classes : il peut, en te citant.* |  |
| CC BY 4.0 | Tout le monde peut tout reprendre, même pour le vendre, à condition de te citer. *Un éditeur vend un supplément qui reprend tes règles : permis, avec ton nom crédité.* |  |
| Tous droits réservés | On peut lire les règles et jouer avec, mais pas copier ni adapter le texte sans ton accord. *Un ami veut publier sa version modifiée : il doit te demander.* |  |

### Pour le code Foundry

| Option | Comment ça marche | Vu dans |
| --- | --- | --- |
| MIT (conseillé) | Tout le monde peut réutiliser le code, même dans un projet payant, en gardant ton nom dans le fichier de licence. Très courant pour les systèmes Foundry. *Quelqu'un reprend ta jauge de tour pour son système : permis, ton nom reste dans sa licence.* |  |
| GPL 3 | On peut réutiliser le code, mais ce qui en est tiré doit publier son code sous la même licence. *Il reprend ta jauge de tour : son système doit aussi être en GPL.* |  |
| Aucune licence | Le code est visible, mais personne n'a le droit de le réutiliser. *Il voit comment tu as fait la jauge, mais ne peut pas la copier.* |  |

## 3. La première version dans Foundry

Toutes les règles sont décidées. Le code se fera en trois étapes (schéma ci-dessous). Ici, tu choisis ce qui entre dans la première : « Oui », dans la première version ; « Non », plus tard ; « À changer », avec une note. Le but : jouer un premier combat, Hugo contre une goule.

**Exemples**

- Tu ouvres la fiche de Hugo : PV, santé mentale, endurance et Esquive sont déjà calculés.
- Tu cliques sur Biologie, tu choisis « Dur » et 1 dé d'avantage : le chat affiche « 64 + 7 + 70 = 141, réussi ».
- Hugo tire sur la goule : 112 contre 90, touché. Un bouton « Appliquer 5 dégâts » enlève les PV au jeton.
- Ce qui n'y est pas encore (fêlures, blessures, missions) se gère à la main, comme sur papier, en attendant les étapes 2 et 3.

### Dans la première version ?

- La fiche d'agent : caractéristiques, talents et domaines ; PV, santé mentale, endurance, Esquive et Perception passive calculés tout seuls. *Tu passes l'Agilité de Hugo de 50 à 55 : son Esquive passe de 100 à 105.*
- Le jet : un clic sur un talent ouvre une petite fenêtre (difficulté, dés d'avantage ou de désavantage), puis le chat affiche le total, réussi ou raté, critique ou catastrophe. *Biologie, « Dur », 1 dé d'avantage : « 64 + 7 + 70 = 141 : réussi ».*
- Les trois barres sur le jeton : PV, santé mentale et endurance. La fatigue sur la fiche. *Au-dessus du jeton de Hugo : 14/20, 13/20 et 7/10.*
- L'attaque : un clic sur une arme lance le jet contre l'Esquive de la cible visée, paie l'endurance, et propose d'appliquer les dégâts moins l'armure. *Pistolet sur la goule : 112 contre 90, touché ; « Appliquer 5 dégâts ».*
- Les réactions : quand un agent est touché, un bouton éviter, parer ou encaisser apparaît dans le chat, s'il a assez d'endurance. *La goule touche Hugo : « Parer (3 d'endurance) » s'affiche ; il clique et lance son jet.*
- La jauge de tour à la place de l'initiative de Foundry : la liste du combat montre qui joue, avec 50 + Vitesse. *Dans la liste : Boss, Goule, Boss, Hugo, Boss…*
- L'endurance revient toute seule au début de chaque tour (4 + Stamina ÷ 20), sans dépasser le maximum. *Hugo commence son tour à 7 : il passe à 10, son maximum, au lieu de 13.*
- Une fiche de monstre simple : catégorie, PV, Esquive, armure, attaques, endurance et Vitesse. Sans les briques. *Tu choisis la catégorie II : 35 PV, Esquive 90, +55 et 2d6 se remplissent tout seuls.*
- Les armes et les armures comme objets : dé, type de dégâts, bruit, balles. On les glisse sur la fiche. *Tu glisses un revolver sur Hugo : d10 perforant, 6 balles, une ligne de plus dans ses armes.*
- Les classes, les dons et les techniques écrits sur la fiche, mais pas encore calculés : le MJ les applique à la main. *« Marquer » est écrit sur la fiche de Hugo ; le MJ ajoute le dé d'avantage lui-même.*
