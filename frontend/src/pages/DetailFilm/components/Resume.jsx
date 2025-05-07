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
    <div className=" md:w-2/3 w-full ">
      <div className="w-full h-full ">
        <div className="mb-8 flex-col  text-center  items-center">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            Résumé
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
            {detailFilm.synopsis}
          </p>
        </div>

        <div className=" flex-col  text-center justify-center">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            Casting
          </h2>
          <div className=" mb-8 flex flex-wrap gap-2 justify-center items-center">
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
