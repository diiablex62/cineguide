import React, { useContext, useEffect, useState } from "react";
import { ActorContext } from "../../context/ActorContext";
import { Outlet, useParams } from "react-router-dom";
import NavActeur from "./components/NavActeur";

export default function ActeurProfil() {
  const { allActors, toggleActor, actor } = useContext(ActorContext);
  const { id } = useParams();

  useEffect(() => {
    const acteur = allActors.find((a) => a.id === Number(id));
    toggleActor(acteur);
  });

  return (
    <div className="flex flex-col gap-8 p-5 items-center text-black dark:text-white mt-12">
      <h2 className="font-bold text-4xl">{actor.nom}</h2>
      <NavActeur />
      <Outlet />
    </div>
  );
}
