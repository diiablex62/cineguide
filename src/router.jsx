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
import ActualiteDetail from "./pages/Actualites/ActualiteDetail";
import ModalAbo from "./components/modal-abo/modalAbo";
import ActeurProfil from "./pages/Acteurs/ActeurProfil";
import AccueilActeur from "./pages/Acteurs/components/AccueilActeur";
import BiographieActeur from "./pages/Acteurs/components/BiographieActeur";
import FilmographieActeur from "./pages/Acteurs/components/FilmographieActeur";
import RecompensesActeur from "./pages/Acteurs/components/RecompensesActeur";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/film",
        element: <FilmList />,
      },

      {
        path: "/detailserie",
        element: <DetailSerie />,
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
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/actualites",
        element: <ActualitesPage />,
      },
      {
        path: "/actualites/article",
        element: <ActualiteDetail />,
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
        element: <ModalAbo />,
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
