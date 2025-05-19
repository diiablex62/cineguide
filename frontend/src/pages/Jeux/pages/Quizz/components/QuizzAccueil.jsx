import React, { useContext } from "react";
import { QuizzContext } from "../../../../../context/QuizzContext";
import { NavLink } from "react-router-dom";

export default function QuizzAccueil() {
  const { questionsPerso } = useContext(QuizzContext);
  const hasResponses = questionsPerso?.some((q) => q.response?.trim() !== "");
  const allQuestionsAnswered = questionsPerso?.every(
    (q) => q.response?.trim() !== ""
  );
  console.log(hasResponses);

  return (
    <div className="flex flex-col gap-2.5 py-11 px-14 h-full">
      <div className="flex flex-col">
        {hasResponses ? (
          <h2 className="text-3xl font-bold">Quiz Personnalisé</h2>
        ) : (
          <h2 className="text-3xl font-bold">
            Bienvenue dans le Quiz Personnalisé
          </h2>
        )}
        <p className="italic text-gray-500">
          <span className="underline">Objectif:</span>
          <span>
            répondre aux questions posées en rapport avec vos préférences.
          </span>
          <span className="underline">
            Attention : la vitesse des réponses compte !
          </span>
        </p>
      </div>
      <h3 className="font-bold text-xl">Etape 1 :</h3>
      {hasResponses ? (
        <div className="flex flex-col gap-2.5 py-7 h-full">
          <div className="flex flex-col gap-2.5">
            <p className="font-bold underline">
              Voir mes réponses aux questions de personnalisation
            </p>
            <div className="flex flex-col gap-1 w-full h-full">
              {questionsPerso
                .filter((q) => q.response && q.response.trim() !== "")
                .map((q, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <p className="font-bold">
                      <span className="text-fuchsia">
                        {`Question ${q.id} :`}
                      </span>{" "}
                      {q.question}
                    </p>
                    <p>Ma réponse</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 p-7">
            <NavLink
              to="personnalisation"
              className="bg-fuchsia flex justify-center items-center h-[50px] px-2 text-white w-[250px] text-center"
            >
              Modifier mes réponses
            </NavLink>
            <NavLink
              to="questions"
              className={`bg-fuchsia flex justify-center items-center h-[50px] px-2 text-white w-[250px] text-center text-sm ${
                allQuestionsAnswered ? "" : "hidden"
              }`}
            >
              Démarrer mon quiz personnalisé
            </NavLink>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
