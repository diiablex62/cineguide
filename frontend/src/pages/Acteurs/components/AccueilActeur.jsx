import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";
import { Link } from "react-router-dom";

export default function AccueilActeur() {
  const { actor } = useContext(ActorContext);

  return (
    <>
      <div className="flex justify-center gap-2.5 py-9 max-1100:flex-col max-1100:items-center max-1100:w-full">
        <img
          src={actor.image}
          alt={actor.nom}
          className="w-[300px] dark:border dark:border-white"
        />
        <div className="flex flex-col justify-between gap-5 px-5 py-3.5 max-1100:items-center max-1100:w-full">
          <p className="text-center">
            Métiers : <span className="font-bold">{actor.metiers}</span>
          </p>
          <p className="max-1100:text-center">
            Nom de naissance :{" "}
            <span className="font-bold">{actor.nom_de_naissance}</span>
          </p>
          <p className="max-1100:text-center">
            Nationalité : <span className="font-bold">{actor.nationalite}</span>
          </p>
          <p className="max-1100:text-center">
            Naissance :{" "}
            <span className="font-bold">{actor.date_de_naissance}</span>
          </p>
          <p className="max-1100:text-center">
            Âge : <span className="font-bold">{actor.age}</span>
          </p>
          <p className="max-1100:text-center">
            Oeuvres principales :{" "}
            <span className="font-bold">
              {actor.oeuvres_principales
                ? actor.oeuvres_principales.join(", ")
                : ""}
            </span>
          </p>
          <div className="flex items-center gap-2.5 max-1100:flex-col">
            <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
              {actor.carriere ? (
                <>
                  <span className="font-bold">{actor.carriere}</span>
                  <p>ans de carrière</p>
                </>
              ) : null}
            </div>
            <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
              <span className="font-bold">{actor.nb_films}</span>
              <p>films et séries tournés</p>
            </div>
            <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
              <span className="font-bold">
                {actor.prix || actor.nominations}
              </span>
              <p>prix</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 py-2.5 px-96 max-1500:px-64 max-xl:px-40 max-1100:px-32 max-md:px-4">
        <h3 className="font-bold text-2xl max-1100:text-center">Biographie</h3>
        <p className="line-clamp-5 overflow-hidden max-1100:text-center max-1100:line-clamp-10">
          {actor.biographie}
        </p>
        <Link
          to={`/acteurs/${actor.id}/biographie`}
          className="underline text-fuchsia font-bold max-1100:text-center"
        >
          Lire plus
        </Link>
      </div>
    </>
  );
}
