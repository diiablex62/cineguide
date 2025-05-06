import React, { useContext, useState } from "react";

import win from "../../../../assets/jeux/win.svg";
import loose from "../../../../assets/jeux/loose.svg";
import Confetti from "react-confetti";
import { AfficheContext } from "../../../../context/AfficheContext";
export default function Etape3() {
  const { reponse, reset, winOrLoose, affiche } = useContext(AfficheContext);

  return (
    <div className="w-full lg:w-6/8 lg:flex lg:flex-col  lg:h-screen  px-10 mb-20">
      <Confetti></Confetti>
      <div className="flex flex-col justify-center lg:flex-start mt-5 w-full">
        <h2 className="font-medium text-center lg:text-start text-xl ">
          Bienvenue dans Affiche brouillées
        </h2>
        <p className="text-center italic opacity-80 lg:text-start ">
          Objectif : trouver le film ou la serie le plus rapidement possible
        </p>
        <div className="flex justify-center w-full lg:justify-start">
          <p className="text-center font-medium text-xl mt-5 lg:text-start ">
            Etape 3 :
          </p>
        </div>
      </div>

      <div className="flex flex-col  lg:flex-row lg: mt-30">
        <div className="lg:min-w-[350px] lg:max-w-[350px] w-full flex justify-center">
          <img src={affiche.affiche} alt="" />
        </div>

        {winOrLoose ? (
          <div className="mt-10 lg:mt-0 flex flex-col items-center justify-around w-full mb-6">
            <p>
              Le film été
              <span className="font-bold">
                {" " + affiche.titre.toUpperCase()}
              </span>
            </p>
            <p className="mb-6">Bravo tu as trouvé ! Champion va</p>
            <img className="mb-6" src={win} alt="" />
            <p className="text-green-400 mb-6">Tu as gagné 90 points</p>
            <a className="cursor-pointer underline font-medium mb-6">
              Voir le classement Global
            </a>
            <a
              onClick={reset}
              className="w-[250px] h-[40px] text-white bg-fuchsia flex justify-center items-center cursor-pointer"
            >
              Rejouer ?
            </a>
          </div>
        ) : (
          <div className="mt-10 lg:mt-0 flex flex-col items-center justify-around w-full mb-6">
            <p>
              Le film été
              <span className="font-bold">
                {" " + affiche.titre.toUpperCase()}
              </span>
            </p>
            <p className="mb-6">
              Bravo tu as perdu ! Pas grave retente ta chance mon champion
            </p>
            <img className="mb-6" src={loose} alt="" />
            <p className="text-green-400 mb-6">Tu as gagné 1 point</p>
            <a className="cursor-pointer underline font-medium mb-6">
              Voir le classement Global
            </a>
            <a
              onClick={reset}
              className="w-[250px] h-[40px] text-white bg-fuchsia flex justify-center items-center cursor-pointer"
            >
              Rejouer ?
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
