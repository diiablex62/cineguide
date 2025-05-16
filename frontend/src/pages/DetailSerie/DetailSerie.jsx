import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import Serie from "./components/Serie";
import ResumeSerie from "./components/ResumeSerie";
import { SerieContext } from "../../context/SerieContext";
import { ActorContext } from "../../context/ActorContext";

export default function DetailSerie() {
  const { id } = useParams();
  const { loadSerieDetails, detailSerie } = useContext(SerieContext);
  const { setDetailActor, allActors } = useContext(ActorContext);

  // Premier useEffect pour charger les détails de la série
  useEffect(() => {
    if (id) {
      loadSerieDetails(id);
    }
    
    // Nettoyer l'état lors du démontage du composant
    return () => {
      // Si vous avez une fonction pour réinitialiser les détails, appelez-la ici
    };
  }, [id]); // Dépendance uniquement à l'ID, pas à loadSerieDetails

  // Deuxième useEffect pour gérer les acteurs après que les détails de la série sont chargés
  useEffect(() => {
    if (
      detailSerie &&
      detailSerie.acteurs &&
      detailSerie.acteurs.length > 0 &&
      allActors &&
      allActors.length > 0
    ) {
      const acteursList = Array.isArray(detailSerie.acteurs)
        ? detailSerie.acteurs
        : [detailSerie.acteurs];

      const oneActor = allActors.find((a) => {
        return acteursList.some((acteur) => {
          return (
            a.nom === acteur ||
            (typeof acteur === "object" && a.nom === acteur.nom)
          );
        });
      });

      if (oneActor) {
        setDetailActor(oneActor);
      }
    }
  }, [detailSerie?.id, allActors]); // Dépendance à l'ID de la série, pas à l'objet entier

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