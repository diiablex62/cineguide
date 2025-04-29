import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";
import { NavLink } from "react-router-dom";

export default function FilmographieActeur() {
  const { filmsByActor } = useContext(ActorContext);

  return (
    <div className="w-full">
      <div>
        <div className="flex justify-center md:justify-start ">
          <h2 className="font-bold text-2xl">Filmographie</h2>
        </div>
        <div>
          <h2 className="mt-5 font-bold text-2xl">Acteur</h2>
          <div className="flex items-center bg-gray-300 rounded-tl rounded-tr h-[50px] px-1 mt-4">
            <p className="md:w-1/3 hidden md:block px-1">Année</p>
            <p className="md:w-1/3 px-1">Titre</p>
            <p className="md:w-1/3 hidden md:block px-1 text-right">Rôle</p>
          </div>
          {filmsByActor.map((film) => (
            <div key={film.id} className="flex items-center h-[50px]">
              <p className="md:w-1/3 hidden md:block px-1">
                {film.annee_sortie}
              </p>
              <NavLink
                to={`/detailfilm/${film.id}`}
                className="font-bold underline ml-2 md:w-1/3 px-1"
              >
                {film.titre}
              </NavLink>
              <p className="md:w-1/3 hidden md:block px-1 text-right">
                {film.role}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="mt-5 font-bold text-2xl">Producteur</h2>
          <div className="flex items-center bg-gray-300 rounded-tl rounded-tr h-[50px] px-1 mt-4">
            <p className="md:w-1/3 hidden md:block px-1">Année</p>
            <p className="md:w-1/3 px-1">Titre</p>
            <p className="md:w-1/3 hidden md:block px-1 text-right">Rôle</p>
          </div>
          {filmsByActor
            .filter((film) => film.estProducteur)
            .map((film) => (
              <div key={film.id} className="flex items-center h-[50px]">
                <p className="md:w-1/3 hidden md:block px-1">
                  {film.annee_sortie}
                </p>

                <NavLink
                  to={`/detailfilm/${film.id}`}
                  className="font-bold underline ml-2 md:w-1/3 px-1"
                >
                  {film.titre}
                </NavLink>
                <p className="md:w-1/3 hidden md:block px-1 text-right">
                  {film.role}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
