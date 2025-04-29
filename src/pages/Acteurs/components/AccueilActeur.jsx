import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";

export default function AccueilActeur() {
  const { actor } = useContext(ActorContext);

  return (
    <>
      <div className="flex justify-center items-center gap-2.5 py-9">
        <img src={actor.image} alt={actor.nom} className="w-[300px]" />
        <div className="flex flex-col justify-between gap-5 px-5 py-3.5 h-fill">
          <p>
            Métiers : <span className="font-bold">{actor.metiers}</span>
          </p>
          <p>
            Nom de naissance :{" "}
            <span className="font-bold">{actor.nom_de_naissance}</span>
          </p>
          <p>
            Nationalité : <span className="font-bold">{actor.nationalite}</span>
          </p>
          <p>
            Naissance :{" "}
            <span className="font-bold">{actor.date_de_naissance}</span>
          </p>
          <p>
            Âge : <span className="font-bold">{actor.age}</span>
          </p>
          <p>
            Oeuvres principales :{" "}
            <span className="font-bold">
              {actor.oeuvres_principales
                ? actor.oeuvres_principales.join(", ")
                : ""}
            </span>
          </p>
          <div className="flex justify-center items-center gap-2.5">
            <div className="flex flex-col justify-center items-center p-5 border min-w-[150px]">
              {actor.carriere ? (
                <>
                  <span className="font-bold">{actor.carriere}</span>
                  <p>ans de carrière</p>
                </>
              ) : null}
            </div>
            <div className="flex flex-col justify-center items-center p-5 border min-w-[150px]">
              <span className="font-bold">{actor.nb_films}</span>
              <p>films et séries tournés</p>
            </div>
            <div className="flex flex-col justify-center items-center p-5 border min-w-[150px]">
              <span className="font-bold">
                {actor.prix || actor.nominations}
              </span>
              <p>prix</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 py-2.5">
        <h3>Biographie</h3>
        <p>{actor.biographie}</p>
      </div>
    </>
  );
}
