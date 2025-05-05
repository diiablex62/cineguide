import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import FilmList from "./pages/Films/FilmList";
import Connexion from "./pages/Auth/Connexion";
import Inscription from "./pages/Auth/Inscription";
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
import Quizz from "./pages/Jeux/Quizz";
import Devine from "./pages/Jeux/Devine";
import { AfficheContext } from "./context/AfficheContext";
import { AfficheProvider } from "./components/providers/AfficheProvider";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/connexion",
    element: (
      <UserNotConnected>
        <Connexion />
      </UserNotConnected>
    ),
  },
  {
    path: "/inscription",
    element: (
      <UserNotConnected>
        <Inscription />
      </UserNotConnected>
    ),
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
        children: [
          {
            index: true,
            element: <Profil />,
          },
          {
            path: "/profil/mon-activiter",
            element: <ProfilActiviter />,
          },
          {
            path: "/profil/ma-liste",
            element: <ProfilListe />,
          },
          {
            path: "/profil/mes-reviews",
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
            path: "resumeserie",
            element: <ResumeSerie />,
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
            path: "resume",
            element: <Resume />,
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
