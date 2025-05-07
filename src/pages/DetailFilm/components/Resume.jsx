import React, { useContext, useEffect } from "react";
import { FilmContext } from "../../../context/FilmContext";
import { ActorContext } from "../../../context/ActorContext";

export default function Resume() {
  const { detailFilm } = useContext(FilmContext);
  const { detailActor, actorRedirect } = useContext(ActorContext);

  useEffect(() => {
    const movieActors = detailFilm.acteurs;
    {
      movieActors.find((m, index) => m);
    }
  }, [detailFilm, detailActor]);

  return (
    <div className="w-full flex-1">
      <div className="w-full text-center justify-center items-center">
        <div className="mb-8">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            Résumé
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
            {detailFilm.synopsis}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            Casting
          </h2>
          <div className="flex flex-wrap gap-2">
            {detailFilm.acteurs.map((actor) => (
              <div
                key={actor}
                onClick={actorRedirect}
                className="bg-gray-200 dark:bg-gray-800 px-3 py-1 text-xs hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {actor}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
