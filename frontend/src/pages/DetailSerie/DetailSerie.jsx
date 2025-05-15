import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Serie from "./components/Serie";
import ResumeSerie from "./components/ResumeSerie";
import { SerieContext } from "../../context/SerieContext";
import { ActorContext } from "../../context/ActorContext";

export default function DetailSerie() {
  const { id } = useParams();
  const { serie, loadSerieDetails, detailSerie } = useContext(SerieContext);
  const { setDetailActor, allActors } = useContext(ActorContext);

  useEffect(() => {
    // Charger les détails de la série dès que l'ID est disponible
    if (id) {
      loadSerieDetails(id);
    }
  }, [id]);

  useEffect(() => {
    // Une fois que nous avons les détails de la série, essayer de trouver l'acteur correspondant
    if (detailSerie && detailSerie.acteurs && detailSerie.acteurs.length > 0 && allActors && allActors.length > 0) {
      const oneActor = allActors.find((a) => detailSerie.acteurs.includes(a.nom));
      if (oneActor) {
        setDetailActor(oneActor);
      }
    }
  }, [detailSerie, allActors, setDetailActor]);

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white font-poppins">
      <nav className="pb-2 sticky top-0 z-10 shadow-md">
        <div className="flex space-x-2 px-4 py-4 overflow-auto md:justify-center bg-white dark:bg-black">
          <NavLink
            to={""}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Afficher tout
          </NavLink>

          <NavLink
            to={"bandeannonceserie"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Bandes-annonces
          </NavLink>
          <NavLink
            to={"serieproposer"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Séries similaires
          </NavLink>
          <NavLink
            to={"commentaireserie"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Commentaires
          </NavLink>
        </div>
      </nav>

      <div className="w-full p-4">
        <div className="flex flex-col w-full">
          <div className="flex md:flex-row-reverse flex-col w-full ">
            <Serie />
            <ResumeSerie />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}