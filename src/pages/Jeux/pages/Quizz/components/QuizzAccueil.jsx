import React, { useContext } from "react";
import { QuizzContext } from "../../../../../context/QuizzContext";
import { NavLink } from "react-router-dom";

export default function QuizzAccueil() {
  //   const { questionsPerso } = useContext(QuizzContext);
  return (
    <div className="flex flex-col gap-2.5 py-11 px-14 h-full">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">
          Bienvenue dans le Quiz Personnalisé
        </h2>
        <p className="italic text-gray-500">
          <span className="underline">Objectif :</span> répondre aux questions
          posées en rapport avec vos préférences.{" "}
          <span className="underline">
            Attention : la vitesse des réponses compte !
          </span>
        </p>
      </div>
      <h3 className="font-bold text-xl">Etape 1 :</h3>
      {/* {questionsPerso ? (
        <div className="flex flex-col gap-2.5 py-7 h-full">
          <div className="flex flex-col gap-2.5">
            <p className="font-bold underline">
              Voir mes réponses aux questions de personnalisation
            </p>
            <div className="flex flex-col gap-1 w-full">
              {questionsPerso.map((q) => {
                <div className="flex flex-col gap-1">
                  <p className="font-bold">
                    <span className="text-fuchsia">Question {q.id} :</span>{" "}
                    {q.question}
                  </p>
                  <p>Ma réponse : {q.reponse}</p>
                </div>;
              })}
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <button className="bg-fuchsia flex justify-center items-center h-[50px] px-2 text-white">
              Répondre aux questions
            </button>
          </div>
        </div>
      ) : ( */}
      <div className="flex flex-col gap-2.5 py-7 h-full">
        <p className="font-bold underline">
          Répond à ces questions pour personnaliser le quiz :
        </p>
        <div className="flex items-center justify-center h-full">
          <NavLink
            to="personnalisation"
            className="bg-fuchsia flex justify-center items-center h-[50px] px-2 text-white cursor-pointer"
          >
            Répondre aux questions
          </NavLink>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
