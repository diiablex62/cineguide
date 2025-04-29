import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";
import { Link } from "react-router-dom";

export default function BiographieActeur() {
  const { actor } = useContext(ActorContext);

  return (
    <div className="px-56 max-1100:px-32 max-md:px-16 max-sm:px-4">
      <div className="flex justify-between w-full py-9 max-1100:flex-col max-1100:items-center">
        <div className="flex flex-col justify-between px-4 py-3.5 max-md:gap-2 max-md:px-0">
          <p className="max-md:text-center">
            Métiers : <span className="font-bold">{actor.metiers}</span>
          </p>
          <p className="max-md:text-center">
            Nom de naissance :{" "}
            <span className="font-bold">{actor.nom_de_naissance}</span>
          </p>
          <p className="max-md:text-center">
            Nationalité : <span className="font-bold">{actor.nationalite}</span>
          </p>
          <p className="max-md:text-center">
            Naissance :{" "}
            <span className="font-bold">{actor.date_de_naissance}</span>
          </p>
          <p className="max-md:text-center">
            Âge : <span className="font-bold">{actor.age}</span>
          </p>
          <p className="max-md:text-center">
            Oeuvres principales :{" "}
            <span className="font-bold">
              {actor.oeuvres_principales
                ? actor.oeuvres_principales.join(", ")
                : ""}
            </span>
          </p>
        </div>
        <img
          src={actor.image}
          alt={actor.nom}
          className="w-[150px] dark:border dark:border-white"
        />
      </div>
      <div className="flex flex-col gap-2.5 py-2.5 max-md:px-4">
        <h3 className="font-bold text-2xl max-md:text-center">Biographie</h3>
        <p>{actor.biographie}</p>
      </div>
    </div>
  );
}
