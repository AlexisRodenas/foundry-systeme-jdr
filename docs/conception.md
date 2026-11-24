# Conception du système

Ce document sépare ce qui est **décidé**, ce qui est **à choisir** et ce qui est **écarté**.

- Points à trancher maintenant : [points-a-voir.md](points-a-voir.md)
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
| Dés | Base **d100** (remplace le d20). Trois dés d'avantage au maximum par jet. |
| Caractéristiques | Échelle multipliée par 10 : 30 pour une personne normale, 70 pour la limite humaine. La liste est à revoir une par une. |
| Santé mentale | Une deuxième barre de vie, fixée par la Volonté, +1 par niveau. Les jets contre la peur se font sur la Volonté. |
| Endurance | Chaque geste en coûte, déplacement et réactions compris. Elle revient en partie au début de chaque tour. |
| Vitesse | Une **jauge** remplace l'initiative et les rounds : elle se remplit, et on joue quand elle est pleine. |
| Défense | Une valeur fixe, l'**Esquive**. Éviter, parer et encaisser sont des capacités de certains personnages, payées en endurance. |
| À 0 PV | Des jets de survie |
| Forcer un jet raté | D'abord de l'endurance et du temps, puis de la santé mentale, de plus en plus |
| Types de dégâts | Perforant, tranchant, contondant, feu, froid, électrique, toxique, mental ; d'autres à choisir |
| Progression | Niveaux 1 à 20, PV qui montent, XP par mission, compétences qui montent à l'usage |
| Classes | Hybride : une classe légère donne une mécanique unique, le reste s'achète avec des points. |
| Inventaire | En cases, à la manière des jeux de survie : chaque objet prend de la place |
| Monstres | Des fiches faites de briques à activer, selon le monstre |
| Magie par cercles | Pas au cœur du système. Ajout possible plus tard. |
| Plateforme | Foundry VTT v14, dépôt public |
| Méthode | On trie de petites idées venues d'autres jeux, on écrit un brouillon, on corrige, puis on code |

## À choisir

Dans cet ordre, parce que chaque point dépend du précédent :

1. Le d100 : sens de lecture, dé d'avantage, critiques, paliers des jets opposés
2. Les caractéristiques, une par une
3. La jauge de vitesse : comment elle se remplit
4. Les types de dégâts à ajouter et leurs effets
5. L'inventaire : mallette, cases ou les deux ; poids ou non
6. Les barres (PV, santé mentale, endurance) et la liste des compétences, une fois les caractéristiques fixées
7. La suite des règles, à partir de R50, pas encore relue
8. Les classes et leur mécanique
9. Nom définitif et licence

## Écarté

- Vigueur, adrénaline et contamination en barres ; armure en barre ; PV par membre
- Six caractéristiques façon D&D, caractéristique Sensibilité
- Dés de dégâts qui explosent ; réussite critique à 10 d'écart ; un seul d6 gardé parmi plusieurs
- Une action, un mouvement et une réaction par tour
- Médicaments qui soignent l'esprit tout de suite ; traits gagnés après les missions
- Grades et salles à améliorer dans les règles
- Dégâts sacrés et occultes ; tir de suppression (pour l'instant)

## Ordre de construction proposé

Les idées retenues dépassent une complexité moyenne. Pour garder un jeu simple à prendre en main, on avance en trois temps.

1. **Jouable** : fiche, jets, trois barres, combat avec endurance et Vitesse
2. **Horreur** : crises, blessures, équipement, pouvoirs
3. **Campagne** : missions, discrétion, activités, véhicules, briques de monstres
