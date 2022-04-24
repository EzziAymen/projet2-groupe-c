## __Projet 2__: Un mini-serveur

Le rôle de `mini-serveur` est:

1. d'initialiser, de maintenir, et de servir à l'interface graphique.


2. d'échanger avec les pairs les messages et les partager, via GET /getLetters.


3. de chiffrer et déchiffrer les messages en utilisant la
cryptographie asymétrique (RSA), pour garantir la confidentialité.


### Structure de l'application

L'application se trouve dans `projet2/`

      ├── package.json   -  description de dépendances de l'application
├── package-lock.json
├── peers.js             - communication/synchronisation entre pairs
├── publique             -  les fichiers dans `public/*` sont accessible aux clients
│   ├── courriel.html    - code  pour la page `html` de l'application
│   ├── css
│   │   └── style.css    - code pour le style `css` de l'application
│   └── js
│       └── app.js       - code pour navigateur
├── README.md
└── server.js            - code pour le serveur

### Exécuter

Faire:

    > git clone https://github.com/EzziAymen/projet2-groupe-c.git
    > cd projet2
    > npm install
    > npm run dev
    

Le URL du serveur est: http://localhost:5000/