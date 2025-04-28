import React, { useContext, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FilmContext } from "../../../context/FilmContext";

export default function Film() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { detailFilm } = useContext(FilmContext);

  if (!detailFilm) {
    return <div className="p-4 text-center">Chargement du film...</div>;
  }

  return (
    <div className="md:w-1/3 flex-shrink-0 md:pl-4">
      <div className="flex gap-4 p-3 mb-6">
        <div className="bg-gray-800 mb-3 h-64 w-48 relative  overflow-hidden shadow-xl">
          <img
            src={`${detailFilm.image}`}
            alt={`${detailFilm.titre}`}
            className="w-full h-full object-fill"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-between items-start">
            <div>
              <p className="text-sm font-bold md:text-xl">{detailFilm.titre}</p>
            </div>
            <div className="flex mt-1 gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="cursor-pointer text-lg"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  {
                    <FaStar className="text-fuchsia" />
                  }
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 flex items-center text-sm  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span>Listes</span>
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 flex items-center text-sm  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span>Vu</span>
            </button>
          </div>
          <div className="mt-4 text-xs flex justify-center w-full">
            <button className="py-2 px-2 w-full text-center border border-gray-300 dark:border-gray-700  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Connectez-vous pour synchroniser la Watchlist
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 px-3">
        <div className="flex md:flex-col gap-y-4">
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-400">
              GENRES
            </h3>
            <div className="flex flex-wrap gap-2">
              {detailFilm.genre.map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-400">
              DURÉE
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {detailFilm.duree}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 px-3">
        <div className="flex md:flex-col gap-y-4">
         
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-400">
              PAYS DE PRODUCTION
            </h3>
            <div className="flex flex-wrap gap-2">
              {detailFilm.paysProduction.map((pays) => (
                <span
                  key={pays}
                  className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md"
                >
                  {pays}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 px-3">
        <div className="flex md:flex-col gap-y-4">
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-400">
              DATE DE SORTIE
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {detailFilm.dateSortie}
            </p>
          </div>
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-400">
              RÉALISATEUR
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {detailFilm.realisateur}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
