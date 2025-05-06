import React from "react";
import { useContext } from "react";
import { QuizzContext } from "../../../../../context/QuizzContext";

export default function PersonnalisationQuestionsQuizz() {
  const { questionsPerso, updateQuestionsPerso } = useContext(QuizzContext);

  const onSubmit = (values) => {
    updateQuestionsPerso(values);
  };
  return (
    <div className="flex flex-col gap-2.5 py-11 px-14 h-full">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">Quiz Personnalisé</h2>
        <p className="italic text-gray-500">
          <span className="underline">Objectif :</span> répondre aux questions
          posées en rapport avec vos préférences.{" "}
          <span className="underline">
            Attention : la vitesse des réponses compte !
          </span>
        </p>
      </div>
      <h3 className="font-bold text-xl">Etape 1 :</h3>
      <div className="flex py-7">
        <div className="flex flex-col gap-9 items-center justify-center w-full">
          <div className="flex flex-col gap-2.5 items-center w-full">
            <p className="text-fuchsia p-2.5 w-full font-medium">
              Question 1 / 7
            </p>
            <div className="p-8 border border-black bg-white w-full">
              <p className="font-medium text-center">
                Quelles plateformes de streaming utilisez-vous régulièrement ?
              </p>
            </div>
          </div>
          <form
            onSubmit={console.log("lol")}
            className="flex flex-col gap-2.5 items-center w-full"
          >
            <p className="text-fuchsia p-2.5 w-full font-medium">
              Veuillez répondre ci-dessous :
            </p>
            <input
              type="text"
              className="p-8 border border-black bg-white w-full"
            />
            <button
              type="submit"
              className="bg-fuchsia flex justify-center items-center h-[50px] px-2 text-white cursor-pointer"
            >
              Passer à la question suivante
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
