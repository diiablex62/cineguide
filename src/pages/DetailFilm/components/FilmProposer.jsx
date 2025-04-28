import React, { useContext, useState } from "react";
import Films from "../../../data/Film.json";
import Card from "../Card";
import { FilmContext } from "../../../context/FilmContext";

export default function FilmProposer() {
  const { detailFilm, film } = useContext(FilmContext);

  // Filtrer les films par le même genre que le film actuel (mais exclure le film actuel)
  const similarFilms = film
    .filter(
      (film) =>
        film.id !== detailFilm.id &&
        film.genre.some((genre) => detailFilm.genre.includes(genre))
    )
    .slice(0, 6);
  // Obtenir des films populaires (triés par note, excluant le film actuel)
  const popularFilms = [...film]
    .filter((film) => film.id !== detailFilm.id)
    .sort((a, b) => b.note - a.note)
    .slice(0, 6);

  // Obtenez des films spé (triés par note, excluant le film actuel)
  const dramaFilms = film
    .filter((film) => film.id !== detailFilm.id && film.genre.includes("Drame"))
    .slice(0, 6);
  return (
    <div className="w-full flex-1 text-center justify-center items-center">
      <div className="mt-8">
        <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
          Ça pourrait vous intéresser
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {similarFilms.slice(0, 4).map((film) => (
            <Card key={film.id} film={film} currentFilmId={detailFilm.id} />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
            Films populaires
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {popularFilms.map((film) => (
              <Card key={film.id} film={film} currentFilmId={detailFilm.id} />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
            Films Drame
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {dramaFilms.map((film) => (
              <Card key={film.id} film={film} currentFilmId={detailFilm.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
