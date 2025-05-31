# 📸 Photobox

> TD programmation web client en javascript, une galerie qui communique avec une API

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Handlebars](https://img.shields.io/badge/Handlebars-000000?style=flat-square&logo=handlebars.js&logoColor=white)

## 🚀 Fonctionnalités

### 📷 Affichage de photos
- **Visualisation détaillée** : Affichage d'une photo avec ses métadonnées (titre, description, type, dimensions)
- **Informations contextuelles** : Catégorie associée et commentaires
- **Navigation par URL** : Accès direct via l'ID de la photo dans l'URL (`#105`)

### 🖼️ Galerie interactive
- **Navigation intuitive** : Boutons First, Previous, Next, Last avec grisage intelligent
- **Vignettes cliquables** : Sélection rapide d'une photo depuis la galerie
- **Pagination** : Navigation fluide entre les pages de photos
- **État des boutons** : Désactivation automatique en début/fin de galerie

### ✨ Lightbox avancée
- **Ouverture automatique** : Clic sur une vignette ouvre la lightbox
- **Navigation** : Boutons précédent/suivant + raccourcis clavier (←/→)
- **Fermeture multiple** : Bouton X, touche Escape, ou clic sur l'arrière-plan
- **Affichage conditionnel** : Masquage des boutons en première/dernière position
- **Synchronisation** : Mise à jour de l'URL et de l'image principale

### 💬 Système de commentaires
- **Affichage** : Liste des commentaires existants avec pagination
- **Ajout** : Formulaire pour poster de nouveaux commentaires
- **Validation** : Gestion des erreurs et feedback utilisateur
- **Nettoyage** : Décodage automatique des entités HTML

## 🛠️ Technologies utilisées

- **JavaScript ES6+** : Modules, async/await, fetch API
- **Handlebars.js** : Templates pour le rendu dynamique
- **CSS3** : Flexbox, animations, responsive design
- **esbuild** : Bundling et compilation
- **API REST** : Communication avec le backend

## 📦 Installation

### Prérequis
- Node.js (version 14+)

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/korban2u/photobox.git
   cd photobox
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Compiler le projet**
   ```bash
   npm run build
   ```


## 🏗️ Architecture

```
photobox/
├── 📁 css/
│   └── index.css           # Styles principaux et lightbox
├── 📁 js/
│   ├── 📁 lib/
│   │   ├── photoloader.js  # Chargement des ressources API
│   │   └── phox_api.js     # Configuration API
│   ├── gallery.js          # Logique de la galerie
│   ├── gallery_ui.js       # Interface galerie
│   ├── index.js           # Point d'entrée principal
│   ├── lightbox.js        # Fonctionnalités lightbox
│   └── ui.js              # Composants UI génériques
├── 📁 dist/
│   └── index.js           # Bundle compilé
├── index.html             # Page principale
├── package.json           # Configuration npm
└── README.md             # Ce fichier
```


## 🎯 Utilisation

### Navigation de base
1. **Chargement initial** : Une photo s'affiche automatiquement (ID par défaut : 105)
2. **Galerie** : Cliquez sur "Voir galerie" pour afficher les vignettes
3. **Navigation** : Utilisez les boutons First/Prev/Next/Last
4. **Sélection** : Cliquez sur une vignette pour l'afficher

### Lightbox
1. **Ouverture** : Cliquez sur n'importe quelle vignette
2. **Navigation** : 
   - Boutons ◀ ▶ dans la lightbox
   - Flèches ← → du clavier
3. **Fermeture** :
   - Bouton ✕ en haut à droite
   - Touche `Escape`
   - Clic sur l'arrière-plan sombre

### Commentaires
1. **Lecture** : Les commentaires s'affichent automatiquement sous chaque photo
2. **Ajout** : Remplissez le formulaire (titre, pseudo, commentaire)
3. **Envoi** : Cliquez sur "Envoyer" - le formulaire se vide automatiquement

## 🔗 API

L'application utilise l'API Phox hébergée sur :
```
https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api
```

### Endpoints utilisés
- `GET /photos` : Liste des photos avec pagination
- `GET /photos/{id}` : Détails d'une photo spécifique
- `POST /photos/{id}/comments` : Ajout d'un commentaire


## 👥 Équipe

- **Ryan Korban** 
- **Baptiste Delaborde** 
