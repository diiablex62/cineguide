import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";
import { NavLink } from "react-router-dom";

export default function RecompensesActeur() {
  const { recompenseByActor } = useContext(ActorContext);

  return (
    <div className="w-full">
      <div>
        <div className="flex justify-start ">
          <h2 className="font-bold text-2xl">Resultat</h2>
        </div>
        <div>
          <h2 className="mt-5 font-bold text-2xl">Acteur</h2>

          {recompenseByActor.map((recompense, index) => (
            <div key={index}>
              <div className="flex items-center bg-gray-300 rounded-tl rounded-tr h-[50px] px-1 mt-4">
                <p className="md:w-1/2 px-1">
                  {recompense.nomRecompense} ({recompense.numEdition})
                </p>
                <p className="md:w-1/2 hidden md:block px-1 text-right">
                  {recompense.annee}
                </p>
              </div>
              <div className="flex items-center h-[50px] border-b border-gray-300">
                <p className="md:w-1/3 hidden md:block px-1">Nommé</p>
                <p className="md:w-1/3 px-1">
                  {recompense.nomRecompense} dans
                  <NavLink
                    to={`/detailfilm/${recompense.film?.id}`}
                    className="font-bold underline ml-2"
                  >
                    {recompense.film?.titre}
                  </NavLink>
                </p>
                <p className="md:w-1/3 hidden md:block px-1 text-right">
                  {recompense.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
