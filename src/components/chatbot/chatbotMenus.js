const USERNAME = "Alex";

export const mainMenu = {
  message: "Comment je peux vous aider ?",
  keywords: ["Trouver un film", "Trouver une série", "Mon compte", "Jeux"],
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
  message: "Que souhaitez-vous faire dans votre compte ?",
  keywords: [
    "Modifier mon profil",
    "Ma liste",
    "Historique de mes factures",
    "Changer de mot de passe",
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
  "Changer de mot de passe":
    'Pour changer votre mot de passe, cliquez d\'abord sur "Mon compte" en haut ou rendez-vous sur http://localhost:5173/profil, puis sur "Changer de mot de passe".',
  "Historique de mes factures":
    'Pour consulter vos factures, cliquez sur "Mon compte" en haut ou allez sur http://localhost:5173/profil, puis sélectionnez "Historique de mes factures" dans le menu.',
  "Modifier mon profil":
    'Pour mettre à jour votre profil, cliquez sur "Mon compte" ou allez sur http://localhost:5173/profil, puis sélectionnez "Modifier mon profil".',
  "Gérer mon abonnement":
    'Pour gérer votre abonnement, cliquez sur "Mon compte" ou allez sur http://localhost:5173/profil, puis sélectionnez "Gérer mon abonnement".',
};
