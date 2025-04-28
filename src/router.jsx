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
import Profil from "./pages/Profil/Profil";
import ModalAbo from "./components/modal-abo/modalAbo";
import TousSerie from "./pages/DetailSerie/components/TousSerie";
import ResumeSerie from "./pages/DetailSerie/components/ResumeSerie";
import BandeAnnonceSerie from "./pages/DetailSerie/components/BandeAnnonceSerie";
import CommentaireSerie from "./pages/DetailSerie/components/CommentaireSerie";
import SerieProposer from "./pages/DetailSerie/components/SerieProposer";
import NotFound from "./pages/404";
import ProfilVueParAutre from "./pages/ProfilVueParAutre/ProfilVueParAutre";
import List from "./pages/ProfilVueParAutre/components/List";
import Activite from "./pages/ProfilVueParAutre/components/Activite";
import Review from "./pages/ProfilVueParAutre/components/Review";

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
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/profilvuparautre",
        element: <ProfilVueParAutre />,
        children: [
          {
            index: true,
            element: <List />,
          },
          {
            path: "activite",
            element: <Activite />,
          },
          {
            path: "review",
            element: <Review />,
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
        path: "/actualites/:title",
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
      { path: "*", element: <NotFound /> },
    ],
  },
]);
