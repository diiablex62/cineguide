import React, { useState } from "react";

export default function QuestionsQuizz() {
  const [selectedButtonId, setSelectedButtonId] = useState(null); // État pour suivre le bouton sélectionné

  function selectedResponse(event) {
    const buttonId = event.target.id; // Récupère l'id du bouton cliqué
    setSelectedButtonId(buttonId); // Met à jour l'état avec l'id du bouton cliqué
  }

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
      <h3 className="font-bold text-xl">Etape 2 :</h3>
      <div className="flex py-7">
        <div className="flex flex-col gap-9 items-center justify-center w-full">
          <div className="flex flex-col gap-2.5 items-center w-full">
            <p className="text-fuchsia p-2.5 w-full font-medium">
              Question 1 / 10
            </p>
            <div className="p-8 border border-black bg-white w-full">
              <p className="font-medium text-center">
                Dans quel film un parc rempli de dinosaures devient
                incontrôlable ?
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-7 py-7 justify-center items-center">
            <div className="flex gap-7 items-center">
              <button
                id="1"
                onClick={selectedResponse}
                className={`flex items-center justify-center py-5 border border-black w-[300px] ${
                  selectedButtonId === "1"
                    ? "bg-fuchsia text-white"
                    : "bg-white text-black"
                }`}
              >
                Godzilla
              </button>
              <button
                id="2"
                onClick={selectedResponse}
                className={`flex items-center justify-center py-5 border border-black w-[300px] ${
                  selectedButtonId === "2"
                    ? "bg-fuchsia text-white"
                    : "bg-white text-black"
                }`}
              >
                Jurassic Park
              </button>
            </div>
            <div className="flex gap-7 items-center">
              <button
                id="3"
                onClick={selectedResponse}
                className={`flex items-center justify-center py-5 border border-black w-[300px] ${
                  selectedButtonId === "3"
                    ? "bg-fuchsia text-white"
                    : "bg-white text-black"
                }`}
              >
                Super Mario Bros. le film
              </button>
              <button
                id="4"
                onClick={selectedResponse}
                className={`flex items-center justify-center py-5 border border-black w-[300px] ${
                  selectedButtonId === "4"
                    ? "bg-fuchsia text-white"
                    : "bg-white text-black"
                }`}
              >
                L'Âge de Glace 3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
