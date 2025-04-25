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
import ActualiteDetail from "./pages/Actualites/ActualiteDetail";
import ModalAbo from "./components/modal-abo/modalAbo";

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
      },
      {
        path: "/abonnement",
        element: (
       
              <ModalAbo />
     
        ),
      },
    ],
  },
]);
