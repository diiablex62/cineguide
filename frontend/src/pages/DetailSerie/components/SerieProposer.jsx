import React, { useContext, useEffect } from "react";
import Card from "../Card";
import { SerieContext } from "../../../context/SerieContext";
import { useParams } from "react-router-dom";

export default function SerieProposer() {
  const { id } = useParams();
  const { detailSerie, serie, loadSerieDetails, loading, filteredSeries } =
    useContext(SerieContext);

  // Ne chargez les détails que si l'ID est différent de celui déjà chargé
  useEffect(() => {
    if (
      id &&
      (!detailSerie ||
        !detailSerie._id ||
        String(detailSerie._id) !== String(id))
    ) {
      loadSerieDetails(id);
    }
  }, [id, detailSerie, loadSerieDetails]); // Ajout des dépendances manquantes

  // Affichage de chargement si les données ne sont pas encore disponibles
  if (loading || !serie || !serie.length || !detailSerie || !detailSerie._id) {
    return <div className="p-4">Chargement des recommandations...</div>;
  }

  // Vérification de sécurité supplémentaire
  if (!Array.isArray(serie)) {
    console.error("La liste des séries n'est pas un tableau:", serie);
    return <div className="p-4">Impossible de charger les recommandations</div>;
  }

  // Définition des séries similaires - filtrer par genre avec vérification de sécurité
  const similarSeries = filteredSeries.filter(
    (item) =>
      item &&
      detailSerie &&
      String(item._id) !== String(detailSerie._id) &&
      item.genre &&
      Array.isArray(item.genre) &&
      detailSerie.genre &&
      Array.isArray(detailSerie.genre) &&
      item.genre.some((genre) => detailSerie.genre.includes(genre))
  );

  // Définition des séries populaires - tri par note avec vérification des données
  const popularSeries = filteredSeries
    .filter(
      (item) =>
        item && detailSerie && String(item._id) !== String(detailSerie._id)
    )
    .sort((a, b) => (b.note || 0) - (a.note || 0));

  // Définition des séries dramatiques avec vérification de sécurité
  const dramaSeries = filteredSeries.filter(
    (item) =>
      item &&
      detailSerie &&
      String(item._id) !== String(detailSerie._id) &&
      item.genre &&
      Array.isArray(item.genre) &&
      item.genre.includes("Drame")
  );

  return (
    <div className="w-full text-center justify-center items-center">
      <div className="mt-8">
        {similarSeries.length > 0 ? (
          <>
            <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
              Ça pourrait vous intéresser
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {similarSeries.slice(0, 4).map((item) => (
                <Card
                  key={item._id || `similar-${Math.random()}`}
                  serie={item}
                  currentSerieId={detailSerie._id}
                />
              ))}
            </div>
          </>
        ) : null}

        {popularSeries.length > 0 ? (
          <div className="mt-12">
            <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
              Séries populaires
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {popularSeries.map((item) => (
                <Card
                  key={item._id || `popular-${Math.random()}`}
                  serie={item}
                  currentSerieId={detailSerie._id}
                />
              ))}
            </div>
          </div>
        ) : null}

        {dramaSeries.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
              Séries Drame
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {dramaSeries.map((item) => (
                <Card
                  key={item._id || `drama-${Math.random()}`}
                  serie={item}
                  currentSerieId={detailSerie._id}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
