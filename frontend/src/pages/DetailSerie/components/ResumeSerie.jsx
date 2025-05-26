import React, { useContext, useEffect, useState } from "react";
import { SerieContext } from "../../../context/SerieContext";
import { ActorContext } from "../../../context/ActorContext";

export default function ResumeSerie() {
  const { detailSerie, loading } = useContext(SerieContext);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const { actorRedirect } = useContext(ActorContext);

  // Réinitialiser la saison sélectionnée lorsqu'une nouvelle série est chargée
  useEffect(() => {
    if (detailSerie && detailSerie._id) {
      setSelectedSeason(0);
      setShowAllEpisodes(false); // Réinitialiser l'affichage des épisodes
    }
  }, [detailSerie?._id]); // Dépendance uniquement à l'ID

  // Réinitialiser l'affichage des épisodes quand on change de saison
  useEffect(() => {
    setShowAllEpisodes(false);
  }, [selectedSeason]);

  // Sécuriser l'accès aux saisons avec vérification supplémentaire
  const saisons =
    detailSerie && detailSerie.saisons && Array.isArray(detailSerie.saisons)
      ? detailSerie.saisons.filter((saison) => saison) // Filtrer les saisons null/undefined
      : [];

  // Vérifier si les données sont chargées
  if (loading) {
    return (
      <div className="md:w-2/3 w-full p-4">Chargement des informations...</div>
    );
  }

  if (!detailSerie || !detailSerie._id) {
    return <div className="md:w-2/3 w-full p-4">Série non disponible</div>;
  }

  // Vérifier si la saison sélectionnée est valide
  const currentSeason =
    saisons.length > 0 && selectedSeason >= 0 && selectedSeason < saisons.length
      ? saisons[selectedSeason]
      : null;

  // Vérifier si les épisodes existent et sont un tableau
  const episodes =
    currentSeason &&
    currentSeason.episodes &&
    Array.isArray(currentSeason.episodes)
      ? currentSeason.episodes
      : [];

  // Limiter l'affichage des épisodes
  const maxEpisodesToShow = 6;
  const episodesToDisplay = showAllEpisodes
    ? episodes
    : episodes.slice(0, maxEpisodesToShow);
  const hasMoreEpisodes = episodes.length > maxEpisodesToShow;

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
                  key={saison._id || `saison-${saison.numero || index}`}
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
                    <img
                      src={
                        detailSerie.image ||
                        "https://via.placeholder.com/300x450?text=Pas+d'image"
                      }
                      alt={`${detailSerie.titre} - Saison ${
                        saison.numero || index + 1
                      }`}
                      className="w-full h-full object-fill"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x450?text=Erreur";
                      }}
                    />
                  </div>
                  <span className="mt-1 text-xs font-semibold">
                    Saison {saison.numero || index + 1}
                  </span>
                  <span className="text-xs text-gray-500">
                    {saison.nbEpisodes || episodes.length || 0} épisodes
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-center text-gray-500">
              Aucune saison disponible
            </p>
          </div>
        )}

        {/* Affichage des épisodes de la saison sélectionnée */}
        {episodesToDisplay.length > 0 && (
          <div className="space-y-2 mb-8">
            <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
              ÉPISODES - SAISON {currentSeason?.numero || selectedSeason + 1}
            </h2>
            {episodesToDisplay.map((episode, idx) => (
              <div
                key={episode._id || `episode-${episode.numero || idx}`}
                className="border-b border-gray-300 dark:border-gray-700 py-3 flex justify-between items-center"
              >
                <div className="text-start">
                  <span className="text-sm text-start font-medium">
                    {episode.numero || idx + 1}.{" "}
                    {episode.titre || "Titre non disponible"}
                  </span>
                  <p className="text-xs text-start text-gray-500 dark:text-gray-200 mt-1">
                    {episode.synopsis || "Résumé non disponible"}
                  </p>
                </div>
                <span className="text-xs text-start text-gray-500 dark:text-gray-200">
                  {episode.duree || "N/A"}
                </span>
              </div>
            ))}

            {/* Bouton pour afficher plus d'épisodes */}
            {hasMoreEpisodes && !showAllEpisodes && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAllEpisodes(true)}
                  className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors text-sm"
                >
                  <span>Voir tous les épisodes ({episodes.length})</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* Bouton pour réduire la liste */}
            {showAllEpisodes && hasMoreEpisodes && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setShowAllEpisodes(false)}
                  className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors text-sm"
                >
                  <span>Réduire la liste</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Affichage même si aucun épisode n'est disponible */}
        {episodes.length === 0 && currentSeason && (
          <div className="space-y-2 mb-8">
            <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
              ÉPISODES - SAISON {currentSeason.numero || selectedSeason + 1}
            </h2>
            <p className="text-center text-gray-500">
              Aucun épisode disponible pour cette saison
            </p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
            RÉSUMÉ
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
            {detailSerie.synopsis || "Aucun résumé disponible"}
          </p>
        </div>

        {detailSerie.acteurs &&
        Array.isArray(detailSerie.acteurs) &&
        detailSerie.acteurs.length > 0 ? (
          <div className="mb-8">
            <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
              CASTING
            </h2>
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {detailSerie.acteurs.map((actor, index) => (
                <div
                  key={`actor-${index}`}
                  onClick={() => actor && actorRedirect(actor)}
                  className="bg-gray-200 dark:bg-gray-800 px-3 py-1 text-xs hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  {actor || "Acteur inconnu"}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
