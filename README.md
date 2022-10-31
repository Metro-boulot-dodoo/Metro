# Metro

## Prérequis
- NodeJS ^16.18.0
- npm ^8.19.2

## Installer et lancer le projet

### Installation et lancement du projet

Deux solutions s'offrent à vous :
- Lancer le script linux ou windows intitulé respectivement `install.sh` ou `install.bat`. Ce script va, à chaque lancement, installer les dépendances et lancer le projet.  
- Suivre le tutoriel ci-dessous.  

#### Lancer le backend
- Ouvrir 1 terminal dans le dossier Metro
- Copier coller les commandes suivantes dans le terminal   
Sur un système UNIX :
```shell
cd ./backend
cp .env.example .env
npm install
npm run dev
```

Sur un système Windows :
```shell
cd ./backend
copy .env.example .env
npm install
npm run dev
```

#### Lancer le frontend
- Ouvrir 1 terminal dans le dossier Metro
- Copier coller les commandes suivantes dans le terminal   
Sur un système UNIX :
```shell
cd ./frontend
npm install
npm run dev
```

Sur un système Windows :
```shell
cd ./frontend
npm install
npm run dev
```

## Voir le projet
- Ouvrir un navigateur internet moderne (Firefox, Chrome,...)
- Se déplacer vers l'URL : ``http://localhost:5173/``

## Difficultés
Si des difficultés surviennent (notamment durant l'installation), n'hésitez pas à nous contacter : florianlegal@outlook.fr ou florian.le-gal@efrei.net