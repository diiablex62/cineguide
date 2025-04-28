import React, { useContext, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Film from "./components/Film";
import { FilmContext } from "../../context/FilmContext";
// import { ActorContext } from "../../context/ActorContext";

export default function DetailFilm() {
  const { id } = useParams();
  const { film, setDetailFilm } = useContext(FilmContext);
  // const { detailActor, setDetailActor, allActors } = useContext(ActorContext);

  useEffect(() => {
    const detail = film.find((f) => f.id === Number(id));
    // const oneActor = allActors.find((a) => a.id === Number(id));
    console.log("Film detail found:", detail);
    if (detail) {
      setDetailFilm(detail);
      // setDetailActor(oneActor);
    } else {
      console.error("Film not found with id:", id);
    }
  }, [id, film, setDetailFilm]);

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white font-poppins">
      <nav className="py-2 sticky top-0 z-10 shadow-md">
        <div className="flex  space-x-2 px-4 py-4 overflow-auto md:justify-center bg-white dark:bg-black">
          <Link
            to={""}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Afficher tout
          </Link>
          <Link
            to={"resume"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Résumé
          </Link>
          <Link
            to={"bandeannonce"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Bandes-annonces
          </Link>
          <Link
            to={"filmproposer"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Films similaires
          </Link>
          <Link
            to={"commentaire"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Commentaires
          </Link>
        </div>
      </nav>

      <div className="w-full p-4">
        <div className="flex flex-col md:flex-row-reverse">
          <Film />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
