import React, { useContext } from "react";
import { SerieContext } from "../../../context/SerieContext";
import { AuthContext } from "../../../context/AuthContext";
import { FaStar } from "react-icons/fa";

export default function Serie() {
  const { detailSerie } = useContext(SerieContext);
  const { connectedUser } = useContext(AuthContext);

  // Vérifier si les données sont chargées
  if (!detailSerie || !detailSerie.id) {
    return <div className="md:w-1/3 flex-shrink-0 md:pl-4 p-4 text-center">Chargement du détail...</div>;
  }
  
  return (
    <div className="md:w-1/3 flex-shrink-0 md:pl-4 ">
      <div className="flex gap-4 p-3 mb-6">
        <div className="bg-gray-800 mb-3 h-64 w-48 relative overflow-hidden shadow-xl">
          <img
            src={detailSerie.image}
            alt={detailSerie.titre}
            className="w-full h-full object-fill "
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col justify-between items-start">
            <div>
              <p className="text-sm font-bold md:text-xl">
                {detailSerie.titre}
              </p>
            </div>
            <div className="flex mt-1 gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="cursor-pointer text-lg"
                >
                  {<FaStar className="text-fuchsia" />}
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
            {connectedUser ? (
              <button className="py-2 px-2 w-full text-center border border-gray-300 dark:border-gray-700  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                ajouter la Watchlist
              </button>
            ) : (
              <button className="py-2 px-2 w-full text-center border border-gray-300 dark:border-gray-700  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Connectez-vous pour synchroniser la Watchlist
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 px-3 ">
        <div className="flex gap-y-4">
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              GENRES
            </h3>
            <div className="flex flex-wrap gap-2">
              {detailSerie.genre && Array.isArray(detailSerie.genre) && detailSerie.genre.map((genre) => (
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
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              Durée Moyenne des Episodes
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {detailSerie.dureeEpisodeMoyenne}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 px-3">
        <div className="flex gap-y-4">
          <div className="w-1/2 md:w-full">
            <h3 className="font-bold text-sm mb-2 text-black dark:text-gray-200">
              PAYS DE PRODUCTION
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {detailSerie.paysProduction && Array.isArray(detailSerie.paysProduction) 
                ? detailSerie.paysProduction.join(", ")
                : detailSerie.paysProduction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}