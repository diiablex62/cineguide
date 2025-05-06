import React, { useContext, useState } from "react";
import image from "../../../../assets/jeux/affichetest.svg";
import { AfficheContext } from "../../../../context/AfficheContext";
export default function Etape2() {
  const {
    blurLevel,
    setBlurLevel,
    handleRevealClick,
    handleNextIndiceClick,
    handleRevealAllClick,
    currentIndiceIndex,
    countDetails,
    countIndice,
    reponse,
    setStepGame,
    stepGame,
    winOrLoose,
    setWinOrLoose,
    affiche,
  } = useContext(AfficheContext);

  function submitReponse(event) {
    event.preventDefault();
    const inputValue = event.target.reponse.value;
    console.log(reponse.toLowerCase() === inputValue.toLowerCase());

    if (reponse.toLowerCase() === inputValue.toLowerCase()) {
      setWinOrLoose(true);
      setStepGame(3);
    } else if (countDetails === 0 && countIndice === 0) {
      setStepGame(3);
      setWinOrLoose(false);
    } else {
      console.log(bug);
    }
  }

  return (
    <div className="w-full lg:w-6/8 lg:flex lg:flex-col  lg:h-screen  px-10">
      <div className="flex flex-col justify-center lg:flex-start mt-5 w-full">
        <h2 className="font-medium text-center lg:text-start text-xl">
          Bienvenue dans Affiche brouillées
        </h2>
        <p className="text-center italic opacity-80 lg:text-start ">
          Objectif : trouver le film ou la serie le plus rapidement possible
        </p>
        <div className="flex justify-center w-full lg:justify-start">
          <p className="text-center font-medium text-xl mt-5 lg:text-start ">
            Etape 2 :
          </p>
        </div>
      </div>

      <div className="flex flex-col  lg:flex-row lg: mt-30">
        <div className="lg:min-w-[350px] lg:max-w-[350px] w-full flex justify-center">
          <img
            style={{ filter: `blur(${blurLevel}px)` }}
            src={affiche.affiche}
            alt=""
          />
        </div>
        <div className="pl-10 mt-20 flex flex-col lg:w-full">
          <p>Nombre de details restant : {countDetails}</p>
          <p>Nombre de d'indice restant : {countIndice}</p>
          <div className=" px-5 gap-4 flex flex-col items-center lg:flex-row lg:items-center lg:justify-center mt-10">
            <a
              onClick={() => {
                if (countDetails > 0) handleRevealClick();
              }}
              className={`border px-4 py-2 cursor-pointer ${
                countDetails > 0
                  ? "hover:bg-black hover:text-white"
                  : "opacity-50 cursor-not-allowed"
              } text-center`}
            >
              Plus de détails
            </a>
            <a
              onClick={() => {
                if (countIndice > 0) handleNextIndiceClick();
              }}
              className={`border px-4 py-2 cursor-pointer ${
                countIndice > 0
                  ? "hover:bg-black hover:text-white"
                  : "opacity-50 cursor-not-allowed"
              } text-center`}
            >
              Plus d'indice
            </a>
            <a
              onClick={handleRevealAllClick}
              className="border px-4 py-2 cursor-pointer hover:bg-black hover:text-white text-center"
            >
              Révéler
            </a>
          </div>
          <div className="mt-15">
            <p> Indices :</p>
            <div className="border flex flex-wrap gap-5 p-4">
              {affiche.indices
                .slice(0, currentIndiceIndex + 1)
                .map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
            </div>
          </div>
          <form
            onSubmit={submitReponse}
            className="flex flex-col items-center justify-center mt-10"
          >
            <label htmlFor="reponse" className="mt-5">
              Taper votre réponse :
            </label>
            <input
              className="border my-5 w-full h-[40px] px-2"
              id="reponse"
              type="text"
            />
            <button className="bg-fuchsia text-white px-4 py-2 cursor-pointer">
              Tenter ma chance
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
