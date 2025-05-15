import React, { useContext } from "react";
import Card from "../Card";
import { SerieContext } from "../../../context/SerieContext";

export default function SerieProposer() {
  const { detailSerie, serie } = useContext(SerieContext);

  // Vérifier si serie et detailSerie existent avant de les utiliser
  if (!serie || !detailSerie) {
    return <div className="p-4">Chargement des recommandations...</div>;
  }

  // Filtrer les series par le même genre que le serie actuel (mais exclure le serie actuel)
  const similarSeries = serie
    .filter(
      (item) =>
        item.id !== detailSerie.id &&
        item.genre &&
        detailSerie.genre &&
        item.genre.some((genre) => detailSerie.genre.includes(genre))
    )
    .slice(0, 6);

  // Obtenir des series populaires (triés par note, excluant le serie actuel)
  const popularSeries = [...serie]
    .filter((item) => item.id !== detailSerie.id)
    .sort((a, b) => (b.note || 0) - (a.note || 0))
    .slice(0, 6);

  // Obtenez des series spé (triés par note, excluant le serie actuel)
  const dramaSeries = serie
    .filter(
      (item) =>
        item.id !== detailSerie.id && item.genre && item.genre.includes("Drame")
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
