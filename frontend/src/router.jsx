import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import FilmList from "./pages/Films/FilmList";
import Connexion from "./pages/Auth/Connexion";
import Inscription from "./pages/Auth/Inscription";
import Validation from "./pages/Auth/Validation";
import ActualitesPage from "./pages/Actualites/ActualitesPage";
import SeriesList from "./pages/Series/SeriesList";
import MentionsLegales from "./pages/Legal/MentionsLegales";
import CGU from "./pages/Legal/CGU";
import CGV from "./pages/Legal/CGV";
import FAQ from "./pages/Legal/FAQ";
import DetailSerie from "./pages/DetailSerie/DetailSerie";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
import Tous from "./pages/DetailFilm/components/Tous";
import Resume from "./pages/DetailFilm/components/Resume";
import BandeAnnonce from "./pages/DetailFilm/components/BandeAnnonce";
import Commentaire from "./pages/DetailFilm/components/Commentaire";
import FilmProposer from "./pages/DetailFilm/components/FilmProposer";
import Profil from "./pages/Profil/Profil";
import ModalAbo from "./components/modal-abo/modalAbo";
import ActeurProfil from "./pages/Acteurs/ActeurProfil";
import AccueilActeur from "./pages/Acteurs/components/AccueilActeur";
import BiographieActeur from "./pages/Acteurs/components/BiographieActeur";
import FilmographieActeur from "./pages/Acteurs/components/FilmographieActeur";
import RecompensesActeur from "./pages/Acteurs/components/RecompensesActeur";
import ProfilActiviter from "./pages/Profil/ProfilActiviter";
import ProfilListe from "./pages/Profil/ProfilListe";
import ProfileReviews from "./pages/Profil/ProfileReviews";
import TousSerie from "./pages/DetailSerie/components/TousSerie";
import ResumeSerie from "./pages/DetailSerie/components/ResumeSerie";
import BandeAnnonceSerie from "./pages/DetailSerie/components/BandeAnnonceSerie";
import CommentaireSerie from "./pages/DetailSerie/components/CommentaireSerie";
import SerieProposer from "./pages/DetailSerie/components/SerieProposer";
import NotFound from "./pages/404";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import Jeux from "./pages/Jeux/Jeux";
import Affiche from "./pages/Jeux/Affiche";
import Quizz from "./pages/Jeux/pages/Quizz/Quizz";
import Devine from "./pages/Jeux/Devine";
import PersonnalisationQuestionsQuizz from "./pages/Jeux/pages/Quizz/components/PersonnalisationQuestionsQuizz";
import QuestionsQuizz from "./pages/Jeux/pages/Quizz/components/QuestionsQuizz";
import ResultatQuizz from "./pages/Jeux/pages/Quizz/components/ResultatQuizz";
import QuizzAccueil from "./pages/Jeux/pages/Quizz/components/QuizzAccueil";
import { AfficheProvider } from "./components/providers/AfficheProvider";
import ResetPassword from "./pages/Auth/ResetPassword";
import ForgottenPassword from "./pages/Auth/ForgottenPassword";

import AuthLayout from "./components/layout/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  }, // Routes d'authentification avec leur propre layout (sans header/footer)
  {
    element: <AuthLayout />,
    children: [
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "forgotten-password",
        element: (
          <UserNotConnected>
            <ForgottenPassword />
          </UserNotConnected>
        ),
      },
      {
        path: "validation",
        element: <Validation />,
      },
      {
        path: "connexion",
        element: (
          <UserNotConnected>
            <Connexion />
          </UserNotConnected>
        ),
      },
      {
        path: "inscription",
        element: (
          <UserNotConnected>
            <Inscription />
          </UserNotConnected>
        ),
      },
    ],
  },
  {
    path: "/jeux",
    children: [
      {
        index: true,
        element: <Jeux />,
      },
      {
        path: "/jeux/affiche",
        element: (
          <AfficheProvider>
            <Affiche />
          </AfficheProvider>
        ),
      },
      {
        path: "/jeux/quizz",
        element: <Quizz />,
        children: [
          {
            index: true,
            element: <QuizzAccueil />,
          },
          {
            path: "personnalisation",
            element: <PersonnalisationQuestionsQuizz />,
          },
          {
            path: "questions",
            element: <QuestionsQuizz />,
          },
          {
            path: "resultat",
            element: <ResultatQuizz />,
          },
        ],
      },
      {
        path: "/jeux/devine",
        element: <Devine />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profil",
        element: (
          <UserConnected>
            <Profil />
          </UserConnected>
        ),
        children: [
          {
            index: true,
            element: <Profil />,
          },
          {
            path: "mon-activiter",
            element: <ProfilActiviter />,
          },
          {
            path: "ma-liste",
            element: <ProfilListe />,
          },
          {
            path: "mes-reviews",
            element: <ProfileReviews />,
          },
        ],
      },
      {
        path: "/film",
        element: <FilmList />,
      },
      {
        path: "/detailserie/:id",
        element: <DetailSerie />,
        children: [
          {
            index: true,
            element: <TousSerie />,
          },
          {
            path: "bandeannonceserie",
            element: <BandeAnnonceSerie />,
          },
          {
            path: "commentaireserie",
            element: <CommentaireSerie />,
          },
          {
            path: "serieproposer",
            element: <SerieProposer />,
          },
        ],
      },
      {
        path: "/series",
        element: <SeriesList />,
      },
      {
        path: "/mentionsLegales",
        element: <MentionsLegales />,
      },
      {
        path: "/cgu",
        element: <CGU />,
      },
      {
        path: "/cgv",
        element: <CGV />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/actualites",
        element: <ActualitesPage />,
      },
      {
        path: "/detailserie/:id",
        element: <DetailSerie />,
      },
      {
        path: "/detailfilm/:id",
        element: <DetailFilm />,
        children: [
          {
            index: true,
            element: <Tous />,
          },
          {
            path: "bandeannonce",
            element: <BandeAnnonce />,
          },
          {
            path: "commentaire",
            element: <Commentaire />,
          },
          {
            path: "filmproposer",
            element: <FilmProposer />,
          },
        ],
      },
      {
        path: "/abonnement",
        element: (
          <UserConnected>
            <ModalAbo />
          </UserConnected>
        ),
      },
      {
        path: "/acteurs/:id",
        element: <ActeurProfil />,
        children: [
          {
            index: true,
            element: <AccueilActeur />,
          },
          {
            path: "biographie",
            element: <BiographieActeur />,
          },
          {
            path: "filmographie",
            element: <FilmographieActeur />,
          },
          {
            path: "recompenses",
            element: <RecompensesActeur />,
          },
        ],
      },
    ],
  },
]);
