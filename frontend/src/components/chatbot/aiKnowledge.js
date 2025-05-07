export const siteMenu = [
  "Accueil",
  "Films",
  "Séries",
  "Jeux",
  "Mon compte",
  "Profil",
  "Abonnement",
  "Factures",
  "Paramètres",
  "Aide",
  "CGU",
];

export const menuDescriptions = {
  Accueil:
    "Page principale avec les nouveautés, recommandations et sélections du moment.",
  Films:
    "Découvre tous les films disponibles sur Cineguide, avec filtres par genre, acteur, réalisateur, etc.",
  Séries:
    "Retrouve toutes les séries à regarder, avec des filtres pour affiner ta recherche.",
  Jeux: "Joue à des jeux autour du cinéma et des séries.",
  "Mon compte":
    "Gère ton profil, ton abonnement, tes paramètres et consulte ton historique.",
  Profil: "Modifie tes informations personnelles et tes préférences.",
  Abonnement: "Consulte, modifie ou annule ton abonnement Cineguide.",
  Factures: "Accède à l'historique de tes paiements et factures.",
  Paramètres:
    "Change ton mot de passe, ton adresse e-mail ou d'autres réglages du compte.",
  CGU: "Lis les conditions générales d'utilisation du site Cineguide.",
};

export const pageContents = {
  Accueil:
    "Sur la page d'accueil, tu trouves les nouveautés, les recommandations personnalisées, les sélections de films et séries, et les actualités du moment.",
  Films:
    "La page Films affiche tous les films disponibles avec des filtres par genre, année, acteur, réalisateur et des suggestions selon tes goûts.",
  Séries:
    "La page Séries présente toutes les séries, avec des filtres pour trouver rapidement ce que tu veux regarder.",
  Jeux: "Le site propose uniquement trois jeux autour du cinéma et des séries. Tu peux accéder directement aux jeux via les liens : /jeux1, /jeux2, /jeux3. Il n'existe pas d'autres jeux sur Cineguide.",
  "Mon compte":
    "La page Mon compte permet de gérer ton profil, consulter ton abonnement, voir l'historique de tes factures et modifier tes paramètres.",
  Profil:
    "La page Profil te permet de modifier tes informations personnelles, ton avatar et tes préférences de visionnage.",
  Abonnement:
    "La page Abonnement affiche les différents plans, te permet de changer ou annuler ton abonnement et de voir les avantages de chaque offre.",
  Factures:
    "La page Factures liste toutes tes factures et paiements passés, avec la possibilité de télécharger les justificatifs.",
  Paramètres:
    "Dans Paramètres, tu peux changer ton mot de passe, ton adresse e-mail et ajuster d'autres réglages de ton compte.",
  FAQ: "Pour accéder à la FAQ, clique sur 'Plus' dans le menu principal en haut, puis sur 'FAQ'. Tu peux aussi trouver le lien 'FAQ' en bas de page (footer).",
  CGU: "La page CGU présente les conditions générales d'utilisation du site Cineguide.",
  Home: "La page d'accueil propose : nouveautés, top 10 séries de la semaine, meilleures séries d'action, recommandations personnalisées, filtres de recherche par genre/type/note, suggestions de plateformes partenaires (Netflix, Prime Video, Disney+, Hulu), et une section spéciale pour les fans de 'Peaky Blinders'.",
};

export const globalSiteSummary = `
Le site Cineguide est organisé autour de plusieurs composants et pages principales :

Composants :
- Header : barre de navigation principale avec accès aux menus et au logo qui redirige vers la page d'accueil.
  Composition du Header :
    • Logo Cineguide (cliquable, ramène à l'accueil)
    • Menu de navigation : Accueil, Films, Séries, Jeux, Mon compte
    • Icône ou bouton pour accéder au profil/utilisateur
    • (Parfois) barre de recherche ou accès rapide à certaines fonctionnalités
- Footer : pied de page avec informations légales et liens utiles.
  Composition du Footer :
    • Liens vers les pages : Aide, CGU
    • Informations légales (copyright, mentions légales)
    • Réseaux sociaux ou partenaires éventuels
- ChatbotUI : interface du chatbot Cineguide pour discuter et obtenir de l'aide.
- Filtre : permet de filtrer les films et séries par genre, type, note, etc.
- Modale d'abonnement : gestion des abonnements utilisateur.
- Fournisseurs de contexte (providers) : gèrent les données globales (films, séries, thèmes, utilisateurs, etc.).
- Composants d'intégration partenaires : logos et modules pour Netflix, Prime Video, Disney+, Hulu.

Pages principales :
- Accueil (Home) : nouveautés, top 10 séries, meilleures séries d'action, recommandations personnalisées, filtres de recherche, suggestions de plateformes partenaires, section spéciale "Peaky Blinders".
- Films : liste de tous les films avec filtres et affichage sous forme de cartes.
- Séries : liste de toutes les séries avec filtres et affichage sous forme de cartes.
- Acteurs : profils, biographies, filmographies et récompenses des acteurs.
- Profil utilisateur : activités récentes, liste personnelle, avis laissés, gestion du compte.
- Détail série : résumé, bande-annonce, commentaires, suggestions de séries similaires.
- Jeux : section pour jouer à des quiz et mini-jeux autour du cinéma et des séries. Il n'y a que trois jeux disponibles sur Cineguide, accessibles via : /jeux1, /jeux2, /jeux3.
- Aide : FAQ, conseils d'utilisation, formulaire de contact support.
- CGU : conditions générales d'utilisation du site.
- 404 : page d'erreur pour les routes non trouvées.

Chaque page ou composant a un rôle précis pour faciliter la navigation, la découverte de contenu, la gestion du compte utilisateur et l'accès aux jeux.
`;

export const headerSummary = `
Le composant Header de Cineguide contient :
- Le logo Cineguide (cliquable, ramène à l'accueil).
- Une barre de recherche pour trouver un film, une série ou un acteur.
- Un menu de navigation principal avec les liens :
    • Accueil
    • Films
    • Séries
    • Actualités
    • Plus (ouvre un menu supplémentaire)
- Un accès rapide à "Mon compte" si l'utilisateur est connecté, sinon des boutons "Connexion" et "S'inscrire".
- Un bouton pour changer la langue du site.
- Un bouton pour changer le thème (clair/sombre).
- Des icônes de réseaux sociaux (Facebook, X/Twitter).
- Un menu burger pour la navigation sur mobile.

La navigation permet d'accéder facilement à toutes les sections principales du site, de rechercher du contenu, de gérer son compte et de personnaliser l'expérience utilisateur.
`;

export const abonnements = [
  {
    nom: "Silver",
    prix: "20€ / mois",
    avantages: [
      "Pas de pub",
      "Liste (max 20)",
      "Commentaire / jour (max 10)",
      "Notification (nouvelle saison)",
      "Badge Silver",
    ],
  },
  {
    nom: "Gold",
    prix: "50€ / mois",
    avantages: [
      "Pas de pub",
      "Liste (max 50)",
      "Commentaire / jour (max 100)",
      "Notification (nouvelle saison)",
      "Badge",
    ],
  },
  {
    nom: "Diamond",
    prix: "550€ / mois",
    avantages: [
      "Pas de pub",
      "Liste (max illimité)",
      "Commentaire / jour (illimité)",
      "Notification (nouvelle saison)",
      "Badge",
    ],
  },
];

