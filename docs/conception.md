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
| Extrêmes | 96 à 99 critique, 100 super critique ; 2 à 5 catastrophe, 1 super catastrophe |
| Jets opposés | Paliers : 20 points d'écart, 1 dé d'avantage ; 40, 2 dés ; 60, victoire sans jet |
| Caractéristiques | Sept : Force, Agilité, Constitution, Stamina, Intelligence, Esprit, Présence. 30 pour une personne normale, 70 pour la limite humaine. |
| Talents | Nouveau nom des compétences : un bonus ajouté au jet, qui progresse à l'usage (détails à choisir). Perception, Adresse et Instinct sont des talents. |
| Santé mentale | Une deuxième barre de vie, fixée par l'Esprit, +1 par niveau. Les jets contre la peur se font sur l'Esprit. |
| Endurance | Fixée par la Stamina, qui donne aussi le poids porté. Chaque geste en coûte, déplacement et réactions compris. Elle revient en partie au début de chaque tour. |
| Vitesse | Stat secondaire, donnée par l'espèce et d'autres sources |
| Tour de jeu | Une jauge remplace les rounds : elle se remplit de 50 + Vitesse, on joue à 100, puis elle repart. L'initiative donne le remplissage de départ. |
| Défense | Une valeur fixe, l'Esquive (X + Agilité). Éviter, parer et encaisser sont des capacités de certains personnages, payées en endurance. |
| À 0 PV | Des jets de survie |
| Forcer un jet raté | D'abord de l'endurance et du temps, puis de la santé mentale, de plus en plus |
| Crise réussie | On récupère un quart de la santé mentale |
| Types de dégâts | Perforant, tranchant, contondant, feu, froid, électrique, acide, toxique, radiation, sonique, nécrose, mental. Pour les résistances et faiblesses ; effets plus tard. |
| Progression | Niveaux 1 à 20, PV qui montent, XP par mission, talents qui montent à l'usage |
| Classes | Hybride : une classe légère donne une mécanique unique, le reste s'achète avec des points. |
| Inventaire | Des poches en cases, un sac en grille (objets de formes différentes) agrandi par le matériel, et un poids maximal. On combine, on empile, les accessoires agrandissent l'arme. |
| Monstres | Des fiches faites de briques à activer, selon le monstre |
| Magie par cercles | Pas au cœur du système. Ajout possible plus tard. |
| Plateforme | Foundry VTT v14, dépôt public |
| Méthode | On trie de petites idées venues d'autres jeux, on écrit un brouillon, on corrige, puis on code |

## À choisir

1. Le fonctionnement des talents : forme du bonus, coche, progression, avantages débloqués
2. La liste des talents
3. Les formules des barres et des stats, le X de l'Esquive, ce que donne l'espèce
4. Les effets de la fatigue et des paliers de santé mentale
5. La suite des règles, à partir de R50, pas encore relue
6. Les classes et leur mécanique
7. Nom définitif et licence

## Écarté

- Vigueur, adrénaline et contamination en barres ; armure en barre ; PV par membre
- Six caractéristiques façon D&D ; Sensibilité, Savoir, Corpulence, Combat et Souffle en caractéristiques
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
