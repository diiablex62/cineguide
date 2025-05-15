import React, { useContext, useEffect, useState } from "react";
import { SerieContext } from "../../../context/SerieContext";
import { ActorContext } from "../../../context/ActorContext";

export default function ResumeSerie() {
  const { detailSerie } = useContext(SerieContext);
  const [selectedSeason, setSelectedSeason] = useState(0); // Index de la saison sélectionnée
  const { detailActor, actorRedirect } = useContext(ActorContext);

  useEffect(() => {
    // Réinitialiser la saison sélectionnée quand on change de série
    setSelectedSeason(0);
  }, [detailSerie]);

  // Vérifier si detailSerie existe et a des saisons
  if (!detailSerie) {
    return <div>Chargement des données...</div>;
  }

  // S'assurer que detailSerie.saisons est un tableau
  const saisons = Array.isArray(detailSerie.saisons) ? detailSerie.saisons : [];

  return (
    <div className="md:w-2/3 w-full">
      <div className="w-full text-center justify-center items-center">
        {saisons.length > 0 ? (
          <div className="mb-8">
            <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
              {saisons.length} SAISONS
            </h2>
            <div className="flex overflow-x-auto space-x-6 pb-2 md:justify-center md:items-center">
              {saisons.map((saison, index) => (
                <div
                  key={saison._id || `saison-${saison.numero}`}
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
                      alt={`${detailSerie.titre} - Saison ${saison.numero}`}
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
        ) : (
          <div className="mb-8">
            <p className="text-center text-gray-500">Aucune saison disponible</p>
          </div>
        )}

        {/* Affichage des épisodes de la saison sélectionnée */}
        {saisons.length > 0 && 
         selectedSeason >= 0 && 
         selectedSeason < saisons.length && 
         saisons[selectedSeason] && (
          <div className="space-y-2 mb-8">
            <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
              ÉPISODES - SAISON {saisons[selectedSeason].numero}
            </h2>
            {Array.isArray(saisons[selectedSeason].episodes) && saisons[selectedSeason].episodes.length > 0 ? (
              saisons[selectedSeason].episodes.map((episode) => (
                <div
                  key={episode._id || `episode-${episode.numero}`}
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
              ))
            ) : (
              <p className="text-center text-gray-500">Aucun épisode disponible pour cette saison</p>
            )}
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

        {Array.isArray(detailSerie.acteurs) && detailSerie.acteurs.length > 0 && (
          <div className="mb-8">
            <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
              CASTING
            </h2>
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {detailSerie.acteurs.map((actor, index) => (
                <div
                  key={`actor-${index}`}
                  onClick={actorRedirect}
                  className="bg-gray-200 dark:bg-gray-800 px-3 py-1 text-xs hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  {actor}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}