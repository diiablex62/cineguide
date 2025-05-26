import React, { useContext, useState } from "react";
import Films from "../../../data/Film.json";
import Card from "../Card";
import { FilmContext } from "../../../context/FilmContext";
import { useParams } from "react-router-dom";

export default function FilmProposer() {
  const { id } = useParams();
  const { detailFilm, film } = useContext(FilmContext);

  // Filtrer les films par le même genre que le film actuel (mais exclure le film actuel)
  const similarFilms = film.filter(
    (film) =>
      film._id !== detailFilm._id &&
      film.genre.some((genre) => detailFilm.genre.includes(genre))
  );

  // Obtenir des films populaires (triés par note, excluant le film actuel)
  const popularFilms = [...film]
    .filter((film) => film._id !== detailFilm._id)
    .sort((a, b) => b.note - a.note);

  // Obtenez des films spé (triés par note, excluant le film actuel)
  const dramaFilms = film.filter(
    (film) => film._id !== detailFilm._id && film.genre.includes("Drame")
  );

  return (
    <div className="w-full  text-center justify-center items-center">
      <div className="mt-8">
        <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
          Ça pourrait vous intéresser
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {similarFilms.slice(0, 4).map((film) => (
            <Card key={film.id} film={film} currentFilmId={detailFilm.id} />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
            Films populaires
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {popularFilms.map((film) => (
              <Card key={film.id} film={film} currentFilmId={detailFilm.id} />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-200">
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
