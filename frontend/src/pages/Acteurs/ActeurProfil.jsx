import React, { useContext, useEffect, useState } from "react";
import { ActorContext } from "../../context/ActorContext";
import { Outlet, useParams } from "react-router-dom";
import NavActeur from "./components/NavActeur";

export default function ActeurProfil() {
  const { allActors, toggleActor, actor } = useContext(ActorContext);
  const { id } = useParams();

  useEffect(() => {
    function getActor() {
      try {
        // Attendre que allActors soit défini et non vide
        if (allActors && allActors.length > 0) {
          const acteur = allActors.find((a) => a.id === Number(id));
          if (acteur) {
            toggleActor(acteur);
          } else {
            console.error("Acteur introuvable");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'acteur", error);
      }
    }

    getActor();
  }, [allActors, id, toggleActor]);

  return (
    <div className="flex flex-col gap-8 p-5 items-center text-black dark:text-white mt-12">
      <h2 className="font-bold text-4xl">{actor.nom}</h2>
      <NavActeur />
      <Outlet />
    </div>
  );
}
