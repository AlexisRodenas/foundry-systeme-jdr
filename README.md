# A.T.L.A.S.

**Autorité de Traitement et de Localisation des Anomalies Surnaturelles.** Un système de jeu de rôle original pour [Foundry Virtual Tabletop](https://foundryvtt.com/), entre dark fantasy, monde moderne et horreur : un jet d100 à faire dépasser 100, de l'endurance pour chaque geste, la santé mentale comme deuxième barre de vie.

> **État : version 0.1.0, en test.** Les règles sont finies ; l'étape 1 du code (« jouable ») est écrite et doit encore être essayée dans Foundry.

- **Version de Foundry visée :** v14
- **Décisions :** [docs/conception.md](docs/conception.md)
- **Règles :** [docs/regles.md](docs/regles.md)
- **Ce qu'on teste en ce moment :** [docs/points-a-voir.md](docs/points-a-voir.md)
- **Mis de côté pour plus tard :** [docs/plus-tard.md](docs/plus-tard.md)

## Ce que fait la version 0.1.0

- Fiche d'agent en cinq onglets, avec les PV, la santé mentale, l'endurance, l'Esquive et la Perception passive calculés.
- Jet d'un clic sur une caractéristique, un talent ou un domaine : difficulté, dés d'avantage, critiques et catastrophes ; un talent réussi se coche.
- Attaque contre l'Esquive de la cible visée : endurance et balles payées, dégâts, bouton pour les appliquer (armure comprise), réactions éviter, parer et encaisser.
- Combat sans rounds : la jauge de tour (50 + Vitesse) décide qui joue ; l'endurance revient au début de chaque tour.
- Trois barres sur le jeton d'un agent : PV, santé mentale, endurance.
- Fiche de monstre : choisir une catégorie (I à V) remplit ses valeurs de départ.
- Armes, armures et objets.

Les classes, les dons, les techniques, la santé mentale détaillée, les blessures et les missions se gèrent encore à la main (étapes 2 et 3).

## Installer pour tester

Le système n'est pas encore publié sur le site de Foundry. Pour l'essayer, placez ce dossier (ou un lien vers lui) dans `Data/systems/atlas` de votre dossier de données Foundry, puis créez un monde avec le système A.T.L.A.S.

Les tests des règles chiffrées se lancent avec Node : `node tests/regles.test.mjs`.

## Licence

- **Code** (tout sauf le dossier `docs`) : MIT, voir [LICENSE](LICENSE).
- **Texte des règles** (dossier `docs`) : CC BY-NC-SA 4.0, voir [LICENSE-REGLES.md](LICENSE-REGLES.md).
