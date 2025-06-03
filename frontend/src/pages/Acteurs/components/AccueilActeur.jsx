import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";
import { Link } from "react-router-dom";

export default function AccueilActeur() {
  const { actor, getGenredJob } = useContext(ActorContext);

  console.log(actor);

  return (
    <div className="w-[70%]">
      <div className="flex items-center gap-2.5 py-9 max-1100:flex-col max-1100:items-center max-1100:w-full">
        {actor.image === "N/A" ? (
          <p className="flex justify-center items-center w-[300px] h-[400px] font-bold text-4xl dark:border dark:border-white max-md:w-[200px] max-md:h-[300px]">
            ?
          </p>
        ) : (
          <img
            src={actor.image}
            alt={actor.nom}
            className="w-[300px] dark:border dark:border-white"
          />
        )}
        <div className="flex flex-col justify-between gap-5 px-5 py-3.5 max-1100:items-center max-1100:w-full max-md:text-xs">
          <p className="max-1100:text-center">
            Métiers :{" "}
            <span className="font-bold">
              {Array.isArray(actor.metiers)
                ? actor.metiers.map(getGenredJob).join(", ")
                : getGenredJob(actor.metiers)}
            </span>
          </p>
          {actor.nom_de_naissance === actor.name ? null : (
            <p className="max-1100:text-center">
              Autre nom :{" "}
              <span className="font-bold">{actor.nom_de_naissance}</span>
            </p>
          )}
          <p className="max-1100:text-center">
            Lieu de naissance :{" "}
            <span className="font-bold">
              {actor.lieu_de_naissance === "Inconnue"
                ? "N/A"
                : actor.lieu_de_naissance}
            </span>
          </p>
          <p className="max-1100:text-center">
            Naissance :{" "}
            <span className="font-bold">
              {actor.date_de_naissance === "Inconnue"
                ? "N/A"
                : new Date(actor.date_de_naissance).toLocaleDateString("fr-FR")}
            </span>
          </p>
          <p className="max-1100:text-center">
            Âge :{" "}
            <span className="font-bold">
              {actor.age === 0 ? "N/A" : actor.age}
            </span>
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
            {actor.carriere ? (
              <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
                <>
                  <span className="font-bold">
                    {new Date().getFullYear() - actor.carriere}
                  </span>
                  <p>ans de carrière</p>
                </>
              </div>
            ) : null}
            {actor.nb_films === 0 ? null : (
              <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
                <span className="font-bold">{actor.nb_films}</span>
                <p>films et séries tournés</p>
              </div>
            )}
            {actor.prix === 0 && actor.nominations === 0 ? null : actor.prix >=
                1 && actor.nominations === 0 ? (
              <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
                <span className="font-bold">{actor.prix}</span>
                <p>prix</p>
              </div>
            ) : actor.prix >= 1 && actor.nominations >= 1 ? (
              <>
                <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
                  <span className="font-bold">{actor.prix}</span>
                  <p>prix</p>
                </div>
                <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
                  <span className="font-bold">{actor.nominations}</span>
                  <p>nominations</p>
                </div>
              </>
            ) : actor.prix === 0 && actor.nominations >= 1 ? (
              <div className="flex flex-col justify-center items-center p-5 border min-w-[150px] text-center max-1100:w-full">
                <span className="font-bold">{actor.nominations}</span>
                <p>nominations</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 py-2.5">
        <h3 className="font-bold text-2xl max-1100:text-center max-md:text-lg">
          Biographie
        </h3>
        <p className="overflow-hidden max-1100:text-center max-md:text-xs">
          {actor.biographie}
        </p>
      </div>
    </div>
  );
}
