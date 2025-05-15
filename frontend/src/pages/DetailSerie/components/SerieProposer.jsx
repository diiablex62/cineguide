import React, { useContext, useEffect } from "react";
import Card from "../Card";
import { SerieContext } from "../../../context/SerieContext";
import { useParams } from "react-router-dom";

export default function SerieProposer() {
  const { id } = useParams();
  const { detailSerie, serie, loadSerieDetails } = useContext(SerieContext);
  
  useEffect(() => {
    if (id && (!detailSerie || String(detailSerie.id) !== String(id))) {
      loadSerieDetails(id);
    }
  }, [id, detailSerie, loadSerieDetails]);

  if (!serie || !detailSerie) {
    return <div className="p-4">Chargement des recommandations...</div>;
  }

  const similarSeries = serie
    .filter(
      (item) =>
        String(item.id) !== String(detailSerie.id) &&
        item.genre &&
        detailSerie.genre &&
        item.genre.some((genre) => detailSerie.genre.includes(genre))
    )
    .slice(0, 6);

  const popularSeries = [...serie]
    .filter((item) => String(item.id) !== String(detailSerie.id))
    .sort((a, b) => (b.note || 0) - (a.note || 0))
    .slice(0, 6);

  const dramaSeries = serie
    .filter(
      (item) =>
        String(item.id) !== String(detailSerie.id) && 
        item.genre && 
        item.genre.includes("Drame")
    )
    .slice(0, 6);

  return (
    <div className="w-full text-center justify-center items-center">
      <div className="mt-8">
        {similarSeries.length > 0 && (
          <>
            <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
              Ça pourrait vous intéresser
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {similarSeries.slice(0, 4).map((item) => (
                <Card
                  key={item.id}
                  serie={item}
                  currentSerieId={detailSerie.id}
                />
              ))}
            </div>
          </>
        )}

        {popularSeries.length > 0 && (
          <div className="mt-12">
            <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
              Séries populaires
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {popularSeries.map((item) => (
                <Card
                  key={item.id}
                  serie={item}
                  currentSerieId={detailSerie.id}
                />
              ))}
            </div>
          </div>
        )}

        {dramaSeries.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
              Séries Drame
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4">
              {dramaSeries.map((item) => (
                <Card
                  key={item.id}
                  serie={item}
                  currentSerieId={detailSerie.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}