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
| Extrêmes | 96 à 99 critique, 100 super critique ; 2 à 5 catastrophe, 1 super catastrophe, peu importe le score. En combat, un critique double les dés ; un super critique ignore aussi l'armure et blesse le membre. |
| Jets opposés | Chacun lance, le plus haut gagne. À 60 points d'écart ou plus, le plus fort gagne sans jet. |
| Caractéristiques | Sept : Force, Agilité, Constitution, Stamina, Intelligence, Esprit, Présence. 30 pour une personne normale, 70 pour la limite humaine. |
| Talents | Dix : Athlétisme, Discrétion, Adresse, Investigation, Sciences, Perception, Instinct, Survie, Persuasion, Tromperie. Un bonus de 0 à 50 ajouté au jet, avec une caractéristique par défaut. Le combat n'est pas un talent. |
| Progression des talents | Une réussite coche le talent. En fin de mission, 1d100 au-dessus du double du bonus : +1d6. Petit avantage à +15, +30 et +45. |
| Fatigue | De 0 à 5 : chaque cran retire 10 à tous les jets et 1 d'endurance par tour. À 5, on s'écroule. |
| Espèces | Stats secondaires, caractéristiques, un pouvoir et une faiblesse. Elles remplacent les origines. |
| Santé mentale | Une deuxième barre de vie : 5 + Esprit ÷ 2, +1 par niveau. Sous 75 %, phobies et manies ; sous 50 % et 25 %, 10 % puis 25 % de risque par tour de perdre le contrôle ; sous 25 %, 2 dés de désavantage partout ; une fêlure à chaque palier. |
| Endurance | 6 + Stamina ÷ 10, et 4 + Stamina ÷ 20 reviennent à chaque tour. Chaque geste en coûte, déplacement et réactions compris. La Stamina donne aussi le poids porté. |
| Vitesse | Stat secondaire donnée par l'espèce (humain : 30) et d'autres sources |
| Tour de jeu | Une jauge remplace les rounds : elle se remplit de 50 + Vitesse, on joue à 100, puis elle repart. L'initiative donne le remplissage de départ. |
| Défense | Une valeur fixe, l'Esquive : 50 + Agilité, plus ce qui reste à choisir. Elle marche comme l'AC de D&D et n'est pas un talent. Éviter, parer et encaisser sont des capacités de certains personnages, payées en endurance. |
| À 0 PV | Des jets de survie |
| Forcer un jet raté | D'abord de l'endurance et du temps, puis de la santé mentale, de plus en plus |
| Crise réussie | On récupère un quart de la santé mentale |
| Types de dégâts | Perforant, tranchant, contondant, feu, froid, électrique, acide, toxique, radiation, sonique, nécrose, mental. Pour les résistances et faiblesses ; effets plus tard. |
| Progression | Niveaux 1 à 20, XP par mission. PV : 12 + Constitution ÷ 5, puis 3 + Constitution ÷ 20 par niveau. |
| Classes | Hybride : une classe légère donne une mécanique unique, le reste s'achète avec des points. |
| Inventaire | Des poches en cases, un sac en grille (objets de formes différentes) agrandi par le matériel, et un poids maximal. On combine, on empile, les accessoires agrandissent l'arme. |
| Monstres | Des fiches faites de briques à activer, selon le monstre |
| Magie par cercles | Pas au cœur du système. Ajout possible plus tard. |
| Plateforme | Foundry VTT v14, dépôt public |
| Méthode | On trie de petites idées venues d'autres jeux, on écrit un brouillon, on corrige, puis on code |

## À choisir

1. Ce qui s'ajoute à l'attaque, à l'Esquive et aux dégâts
2. Les talents de départ, et où vont les actions des talents enlevés
3. La façon de fabriquer une espèce, et la liste
4. Les fêlures et la perte de contrôle
5. Les petits avantages de talent
6. La suite des règles, à partir de R50, presque pas relue
7. Les classes et leur mécanique
8. Nom définitif et licence

## Écarté

- Vigueur, adrénaline et contamination en barres ; armure en barre ; PV par membre
- Six caractéristiques façon D&D ; Sensibilité, Savoir, Corpulence, Combat et Souffle en caractéristiques
- Talents Mêlée, Lutte, Tir, Esquive, Conduite, Résistance, Effort, Médecine, Informatique, Technique, Occultisme, Intimidation et Commandement (médecine et informatique passent dans Sciences)
- Paliers de 20 et 40 points dans les jets opposés ; hallucinations qui blessent, maximum de santé mentale qui baisse, désavantage sous 50 % et 75 %
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
