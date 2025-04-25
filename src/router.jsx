import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import FilmList from "./pages/Films/FilmsList";
import DetailSerie from "./pages/DetailSerie/DetailSerie";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
import Tous from "./pages/DetailFilm/components/Tous";
import Resume from "./pages/DetailFilm/components/Resume";
import BandeAnnonce from "./pages/DetailFilm/components/BandeAnnonce";
import Commentaire from "./pages/DetailFilm/components/Commentaire";
import FilmProposer from "./pages/DetailFilm/components/FilmProposer";
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
        path: "/detailserie/:id",
        element: <DetailSerie />,
      },
      {
        ath: "/detailfilm",
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
    ],
  },
]);
