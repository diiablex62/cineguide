import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Film from "./components/Film";
import { FilmContext } from "../../context/FilmContext";
import { ActorContext } from "../../context/ActorContext";
import Resume from "./components/Resume";

export default function DetailFilm() {
  const { id } = useParams();
  const { film, setDetailFilm } = useContext(FilmContext);
  const { setDetailActor, allActors } = useContext(ActorContext);

  useEffect(() => {
    const detail = film.find((f) => f.id === Number(id));
    const oneActor = allActors.find((a) => detail.acteurs.includes(a.nom));
    if (detail) {
      setDetailFilm(detail);
      setDetailActor(oneActor);
    } else {
      console.error("Film not found with id:", id);
    }
  }, [id, film, setDetailFilm]);

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white font-poppins">
      <nav className="pb-2 sticky top-0 z-10 shadow-md">
        <div className="flex  space-x-2 px-4 py-4 overflow-auto md:justify-center bg-white dark:bg-black">
          <NavLink
            to={""}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Afficher tout
          </NavLink>
         
          <NavLink
            to={"bandeannonce"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Bandes-annonces
          </NavLink>
          <NavLink
            to={"filmproposer"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Films similaires
          </NavLink>
          <NavLink
            to={"commentaire"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Commentaires
          </NavLink>
        </div>
      </nav>

      <div className="w-full p-4">
        <div className="flex flex-col ">
          <div className="flex md:flex-row-reverse flex-col w-full ">
            <Film />
            <Resume />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
