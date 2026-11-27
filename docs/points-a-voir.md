# Points à voir

> Ce qui reste à trancher ou à essayer avant de continuer. Rien n'est décidé ici.

## 1. Tester la première version

Le nom est trouvé : A.T.L.A.S. Le code de l'étape 1 est écrit. Il reste à l'essayer dans Foundry, point par point, puis à corriger ce qui ne marche pas.

**Exemples**

- On change l'Agilité de Hugo de 50 à 55 : son Esquive passe de 100 à 105, tout seul.
- On clique sur Biologie et on choisit « Dur » : la carte dans le chat dit « 64 + 70 = 134 : réussi ».
- Hugo tire sur la goule : 3 d'endurance et une balle partent, la carte affiche 112 contre 90, touché, 5 dégâts.
- On clique sur « Tour suivant » : la goule joue, puis le boss deux fois plus souvent que Hugo.

### Ce qui doit marcher

- Le système apparaît dans Foundry, et un monde se crée avec, sans message d'erreur. *Écran d'accueil → Mondes → Créer un monde → Système : A.T.L.A.S.*
- La fiche d'agent calcule seule les PV, la santé mentale, l'endurance, l'Esquive et la Perception passive. *Constitution 40 → PV 20 ; Esprit 30 → santé mentale 20 ; Stamina 40 → endurance 10, +6 par tour.*
- Les cinq onglets de la fiche (Agent, Talents, Combat, Classe et dons, Notes) sont clairs et faciles à remplir. *Les talents sont dans l'onglet Talents, avec leur score à côté du bonus.*
- Un clic sur un talent ouvre la petite fenêtre, puis la carte du chat donne le total, réussi ou raté, critique ou catastrophe. *Biologie, « Dur », 1 dé d'avantage : « 64 + 7 + 70 = 141 : réussi ».*
- Un talent réussi se coche tout seul, pour le jet de fin de mission. *Après un jet de Discrétion réussi, la case « Coché » de Discrétion est cochée.*
- Le jeton d'un agent montre trois barres : PV (rouge, en bas), santé mentale (bleue, juste au-dessus), endurance (verte, en haut). *Hugo : 14/20 en rouge, 13/20 en bleu, 7/10 en vert.*
- Choisir une catégorie remplit la fiche du monstre ; on peut ensuite tout changer. *Catégorie II : 35 PV, Esquive 90, +55, 2d6, endurance 10.*
- Viser un jeton puis cliquer sur une arme : l'endurance et la balle sont payées, le jet est comparé à l'Esquive, les dégâts sont lancés. *Pistolet sur la goule : 112 contre 90, touché ; dégâts 1d8 = 6.*
- « Appliquer les dégâts » retire les PV moins l'armure, et une armure traversée perd 1. *6 dégâts, armure 1 : la goule passe de 35 à 30 PV, son armure tombe à 0.*
- Quand un agent est touché, les boutons de ses réactions apparaissent ; parer lance un jet et coûte 3 d'endurance. *La goule touche Hugo : « Parer (3) » ; il fait 125 contre 117, le coup est paré.*
- Le combat suit la jauge : la liste montre qui joue, « Tour suivant » fait avancer, et l'endurance revient au début de son tour. *Ordre avec Hugo (30), la goule (40) et un boss (110) : boss, goule, boss, Hugo…*
- « Tour précédent » remet les jauges comme avant. *Un clic de trop sur « Tour suivant » : on revient en arrière sans casser l'ordre.*
