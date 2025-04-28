import React, { useContext } from "react";
import Card from "../Card";
import { SerieContext } from "../../../context/SerieContext";

export default function SerieProposer() {
  const { detailSerie, serie } = useContext(SerieContext);
  // Filtrer les series par le même genre que le serie actuel (mais exclure le serie actuel)
  const similarSeries = serie
    .filter(
      (serie) =>
        serie.id !== detailSerie.id &&
        serie.genre.some((genre) => detailSerie.genre.includes(genre))
    )
    .slice(0, 6);

  // Obtenir des series populaires (triés par note, excluant le serie actuel)
  const popularSeries = [...serie]
    .filter((serie) => serie.id !== detailSerie.id)
    .sort((a, b) => b.note - a.note)
    .slice(0, 6);

    // Obtenez des series spé (triés par note, excluant le serie actuel)
  const dramaSeries = serie
  .filter((serie) => serie.id !== detailSerie.id && serie.genre.includes("Drame"))
  .slice(0, 6);

  return (
    <div className="md:w-2/3 flex-1">
      <div className="mt-8">
        <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
          Ça pourrait vous intéresser
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {similarSeries.slice(0, 4).map((serie) => (
            <Card key={serie.id} serie={serie} currentSerieId={detailSerie.id} />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
            Films populaires
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {popularSeries.map((serie) => (
              <Card key={serie.id} serie={serie} currentSerieId={detailSerie.id} />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
            Films Drame
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {dramaSeries.map((serie) => (
              <Card key={serie.id} serie={serie} currentSerieId={detailSerie.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
