const USERNAME = "Alex";

export const mainMenu = {
  message: `Bonjour ${USERNAME} ! Vous cherchez quelque chose en particulier aujourd'hui ?`,
  keywords: ["Trouver un film", "Trouver une série", "Mon profil", "Jeux"],
};
export const filmMenu = {
  message: "Que recherchez-vous comme film ?",
  keywords: [
    "Titre",
    "Genre",
    "Acteur",
    "Réalisateur",
    "Recommandations",
    "Revenir au début",
  ],
};
export const serieMenu = {
  message: "Que recherchez-vous comme série ?",
  keywords: [
    "Titre",
    "Genre",
    "Acteur",
    "Série longue",
    "Série courte",
    "Recommandations",
    "Revenir au début",
  ],
};
export const profilMenu = {
  message: "Que souhaitez-vous faire dans votre profil ?",
  keywords: [
    "Modifier mon profil",
    "Ma liste",
    "Historique de mes factures",
    "Changer mon mot de passe",
    "Gérer mon abonnement",
    "Autres demandes",
  ],
};
export const jeuxMenu = {
  message: "Bienvenue dans la section Jeux ! Quel jeu souhaitez-vous essayer ?",
  keywords: [
    "Jeu de Devinettes avec Affiches Brouillées",
    "Devine le Film / Série par la Description Générée par IA",
    "Revenir au début",
  ],
};
export const filmRecoMenu = {
  message:
    "D'après vos préférences, je vous propose : Inception (2010). Ça vous tente ?",
  keywords: [
    "Oui, plus d'infos",
    "Non, faire une recherche",
    "Voir d'autres recommandations",
    "Revenir au début",
  ],
};
export const serieRecoMenu = {
  message:
    "D'après vos préférences, je vous propose : Breaking Bad (2008). Ça vous tente ?",
  keywords: [
    "Oui, plus d'infos",
    "Non, faire une recherche",
    "Voir d'autres recommandations",
    "Revenir au début",
  ],
};
export const profilRedirects = {
  "Ma liste":
    "Vous allez être redirigé vers votre [Ma liste](https://www.google.com/search?q=/profil/ma-liste).",
  "Modifier mon profil":
    "Vous allez être redirigé vers la page de modification de votre profil.",
  "Gérer mon abonnement":
    "Vous allez être redirigé vers la page correspondante.",
  "Historique de mes factures":
    "Vous allez être redirigé vers la page correspondante.",
  "Changer mon mot de passe":
    "Vous allez être redirigé vers la page correspondante.",
};
