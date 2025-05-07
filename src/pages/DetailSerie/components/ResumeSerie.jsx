import React, { useContext, useState } from "react";
import { SerieContext } from "../../../context/SerieContext";

export default function ResumeSerie() {
  const { detailSerie } = useContext(SerieContext);
  const [selectedSeason, setSelectedSeason] = useState(0); // Index de la saison sélectionnée

  // Vérifier si detailSerie existe et a des saisons
  if (!detailSerie || !detailSerie.saisons) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="w-full flex-1">
      <div className="w-full text-center justify-center items-center">
        <div className="mb-8">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            {detailSerie.saisons.length} SAISONS
          </h2>
          <div className="flex overflow-x-auto space-x-6 pb-2 md:justify-center md:items-center">
            {detailSerie.saisons.map((saison, index) => (
              <div
                key={saison.numero}
                className={`flex flex-col items-center cursor-pointer ${
                  selectedSeason === index ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setSelectedSeason(index)}
              >
                <div
                  className={`w-20 h-28 bg-gray-800 ${
                    selectedSeason === index ? "ring-2 ring-fuchsia" : ""
                  }`}
                >
                  {" "}
                  <img
                    src={`${detailSerie.image}`}
                    alt={`${detailSerie.titre}`}
                    className="w-full h-full object-fill "
                  />
                </div>
                <span className="mt-1 text-xs font-semibold">
                  Saison {saison.numero}
                </span>
                <span className="text-xs text-gray-500">
                  {saison.nbEpisodes} épisodes
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Affichage des épisodes de la saison sélectionnée */}
        {detailSerie.saisons.length > 0 && (
          <div className="space-y-2 mb-8">
            <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
              ÉPISODES - SAISON {detailSerie.saisons[selectedSeason].numero}
            </h2>
            {detailSerie.saisons[selectedSeason].episodes.map((episode) => (
              <div
                key={episode.numero}
                className="border-b border-gray-300 dark:border-gray-700 py-3 flex justify-between items-center"
              >
                <div className="text-start">
                  <span className="text-sm text-start font-medium">
                    {episode.numero}. {episode.titre}
                  </span>
                  <p className="text-xs text-start text-gray-500 dark:text-gray-200 mt-1">
                    {episode.synopsis}
                  </p>
                </div>
                <span className="text-xs text-start text-gray-500 dark:text-gray-200">
                  {episode.duree}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            RÉSUMÉ
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
            {detailSerie.synopsis}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            CASTING
          </h2>
          <div className="flex flex-wrap gap-2">
            {detailSerie.acteurs.map((actor, index) => (
              <div
                key={index}
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
