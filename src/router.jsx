import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import FilmList from "./pages/Films/FilmsList";
import DetailSerie from "./pages/DetailSerie/DetailSerie";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
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
        path:"/detailserie",
        element:<DetailSerie/>
      },{
        path:"/detailfilm",
        element:<DetailFilm/>
      }
    ],
  },
]);
