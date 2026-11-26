# Conception du système

Ce document sépare ce qui est **décidé**, ce qui est **à choisir** et ce qui est **écarté**.

- Points à trancher maintenant : [points-a-voir.md](points-a-voir.md)
- Choix déjà faits, avec les options comparées : [choix-faits.md](choix-faits.md)
- Règles en brouillon : [regles.md](regles.md)
- Toutes les idées triées : [idees.md](idees.md)

## Décidé

| Sujet | Décision |
| --- | --- |
| Nom | Provisoire (`systeme-jdr`). À fixer avant de créer un vrai monde Foundry avec ce système. |
| Ambiance | Dark fantasy / moderne / horreur |
| Univers | Un seul, qui mélange les trois |
| Cadre | Une organisation secrète qui règle le paranormal sans se faire remarquer |
| Personnages | Trois types jouables ensemble : gens ordinaires dépassés, chasseurs qui savent, êtres touchés par le surnaturel |
| Complexité | Moyenne : quelques sous-systèmes profonds, le reste simple |
| Sensation des dés | Suspense, tout peut arriver |
| Style de règles | Du concret (barres, stats, jets). Les mécaniques narratives ont presque toutes été écartées. |
| Règles et univers | Les règles ne dépendent pas d'un univers précis : grades, cellules, réputation et renforts restent des choix du MJ. |
| Jet | 1d100 + caractéristique + talent, il faut dépasser 100 (facile 80, dur 120, très dur 140) |
| Avantage | 1d10 par avantage ou désavantage, trois au maximum |
| Extrêmes | 96 à 99 critique, 100 super critique ; 2 à 5 catastrophe, 1 super catastrophe, peu importe le score. En combat, un critique double les dés et donne l'effet léger de la zone touchée ; un super critique ignore aussi l'armure et donne l'effet grave. |
| Jets opposés | Chacun lance, le plus haut gagne. À 60 points d'écart ou plus, le plus fort gagne sans jet. |
| Caractéristiques | Sept : Force, Agilité, Constitution, Stamina, Intelligence, Esprit, Présence. 30 pour une personne normale, 70 pour la limite humaine. |
| Talents | Onze : Athlétisme, Discrétion, Adresse, Acrobatie, Investigation, Sciences, Perception, Instinct, Survie, Persuasion, Tromperie. Un bonus de 0 à 50 ajouté au jet, avec une caractéristique par défaut ; sans talent, la caractéristique seule. Au départ : +15, +15, +10, +10, +5, +5. Sciences est une famille de six domaines (Biologie avec la médecine, Chimie, Physique, Mécanique, Électronique, Informatique), chacun avec son bonus, hors des six bonus de départ : on reçoit Intelligence ÷ 2 points de domaines à la création. Le combat n'est pas un talent. |
| Progression des talents | Une réussite coche le talent. En fin de mission, 1d100 au-dessus du double du bonus : +1d6. |
| Fatigue | De 0 à 5 : chaque cran retire 10 à tous les jets et 1 d'endurance par tour. À 5, on s'écroule. |
| Espèces | Un modèle fixe : une Vitesse, +10 et −10 en caractéristiques, un pouvoir, une faiblesse. Huit exemples : vampire, changelin, psychique, possédé, hybride des profondeurs, être artificiel, ruche, cobaye. L'humain a un don gratuit. Chaque espèce a son corps : une table de zones en 1d10, des organes, un effet léger et un effet grave par zone. Elles remplacent les origines. |
| Santé mentale | Une deuxième barre de vie : 5 + Esprit ÷ 2, +1 par niveau. Sous 75 %, phobies et manies ; sous 50 % et 25 %, 10 % puis 25 % de risque par tour de perdre le contrôle ; sous 25 %, 2 dés de désavantage partout. Une fêlure à chaque palier, trois au plus ; sans contrôle, on fait ce que dit sa fêlure (dix fêlures d'exemple). |
| Endurance | 6 + Stamina ÷ 10, et 4 + Stamina ÷ 20 reviennent à chaque tour. Chaque geste en coûte, déplacement et réactions compris. La Stamina donne aussi le poids porté. |
| Vitesse | Stat secondaire donnée par l'espèce (humain : 30) et d'autres sources |
| Tour de jeu | Une jauge remplace les rounds : elle se remplit de 50 + Vitesse, on joue à 100, puis elle repart. L'initiative donne le remplissage de départ. |
| Attaque | 1d100 + Force ou Agilité + maîtrise (+10, +15 au niveau 10, +20 au niveau 20) contre l'Esquive. Six familles d'armes, deux maîtrisées au départ grâce à la classe. Les dégâts montent avec la qualité de l'arme (standard, militaire, exceptionnelle : un, deux ou trois dés), pas avec le niveau. |
| Dons | Comme D&D 5.5, sans lien avec les talents : un don d'origine au niveau 1 (deux pour l'humain), un don général aux niveaux 4, 8, 12 et 16 (+5 à une caractéristique, limite 70), une faveur épique au niveau 19. Conditions : le niveau, parfois 50 dans une caractéristique, et des chaînes de trois dons au plus. Les faveurs épiques ne demandent aucun don. |
| Défense | Une valeur fixe, l'Esquive : 50 + Agilité + équipement (bouclier +10, protections souples +5, armure lourde −10). Elle marche comme l'AC de D&D et n'est pas un talent. Éviter, parer et encaisser sont des capacités de certains personnages, payées en endurance. |
| À 0 PV | Inconscient. Chaque tour, jet de Constitution facile (80) : trois réussites, stable ; trois échecs, mort. Chaque chute déjà subie dans la mission ajoute 10 à la difficulté. |
| Blessures et soins | Saignements, fractures, membres perdus et prothèses. On soigne avec la Biologie et du matériel ; repos court et repos long. |
| Forcer un jet raté | D'abord de l'endurance et du temps, puis de la santé mentale, de plus en plus |
| Crise réussie | On récupère un quart de la santé mentale |
| Types de dégâts | Perforant, tranchant, contondant, feu, froid, électrique, acide, toxique, radiation, sonique, nécrose, mental. Pour les résistances et faiblesses ; effets plus tard. |
| Progression | Niveaux 1 à 20, XP par mission. PV : 12 + Constitution ÷ 5, puis 3 + Constitution ÷ 20 par niveau. |
| Classes | Une classe légère : deux familles d'armes et une mécanique à elle ; le reste vient des dons. Le détail est à choisir. |
| Inventaire | Des poches en cases, un sac en grille (objets de formes différentes) agrandi par le matériel, et un poids maximal. On combine, on empile, les accessoires agrandissent l'arme. |
| Monstres | Des fiches faites de briques à activer, selon le monstre |
| Magie par cercles | Pas au cœur du système. Ajout possible plus tard. |
| Plateforme | Foundry VTT v14, dépôt public |
| Méthode | On trie de petites idées venues d'autres jeux, on écrit un brouillon, on corrige, puis on code |

## À choisir

1. Les tables du corps des huit espèces autres que l'humain
2. Combien rapporte une mission, combien coûte un niveau
3. Les classes : quand elles s'améliorent, qui a éviter, parer et encaisser, les neuf idées
4. Les autres règles pas encore relues (pouvoirs, équipement, missions, monstres)
5. Nom définitif et licence

## Écarté

- Vigueur, adrénaline et contamination en barres ; armure en barre ; PV par membre
- Six caractéristiques façon D&D ; Sensibilité, Savoir, Corpulence, Combat et Souffle en caractéristiques
- Talents Mêlée, Lutte, Tir, Esquive, Conduite, Résistance, Effort, Médecine, Informatique, Technique, Occultisme, Intimidation et Commandement (médecine et informatique passent dans Sciences)
- Paliers de 20 et 40 points dans les jets opposés ; hallucinations qui blessent, maximum de santé mentale qui baisse, désavantage sous 50 % et 75 %
- Petits avantages de talent à +15, +30 et +45 ; Sciences en un seul bonus ; domaines de Sciences comptés parmi les six bonus de départ ; quatre familles d'armes ; dégâts qui montent avec le niveau
- Espèces loup-garou, revenant, goule et demi-démon (comme exemples)
- Blessure du corps seulement sur un super critique ; compte à rebours ou PV négatifs à 0 PV ; chaînes de dons de deux maillons ou sans limite ; faveurs épiques qui demandent un don
- Dés de dégâts qui explosent ; réussite critique à 10 d'écart ; un seul dé gardé parmi plusieurs
- Une action, un mouvement et une réaction par tour
- Médicaments qui soignent l'esprit tout de suite ; traits gagnés après les missions
- Grades et salles à améliorer dans les règles ; coffre commun
- Dégâts sacrés, occultes, explosifs, viraux, magnétiques, d'asphyxie, d'écrasement, doubles ou en pourcentage ; tir de suppression (pour l'instant)

## Ordre de construction proposé

Les idées retenues dépassent une complexité moyenne. Pour garder un jeu simple à prendre en main, on avance en trois temps.

1. **Jouable** : fiche, jets, trois barres, combat avec endurance et Vitesse
2. **Horreur** : crises, blessures, équipement, pouvoirs
3. **Campagne** : missions, discrétion, activités, véhicules, briques de monstres
