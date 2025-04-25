import React, { useState } from "react";
import Films from "../../../data/Film.json";
import Card from "../Card";

export default function FilmProposer() {
  const [detailFilm, setDetailFilm] = useState({
    id: 1,
    titre: "Le Parrain",
    synopsis: "L'histoire d'une famille mafieuse italienne aux États-Unis.",
    image:
      "https://fr.web.img6.acsta.net/c_310_420/pictures/22/01/14/08/39/1848157.jpg",
    acteurs: ["Marlon Brando", "Al Pacino", "James Caan"],
    duree: "2h55",
    note: 9.2,
    dateSortie: "1972-03-24",
    realisateur: "Francis Ford Coppola",
    bandeAnnonce: "https://www.youtube.com/watch?v=bmtuIhesQWA",
    genre: ["Drame", "Crime"],
    paysProduction: ["États-Unis"],
  });
  const [films, setFilms] = useState(Films);

  const handleFilmClick = (film) => {
    setDetailFilm(film);
    window.scrollTo(0, 0);
  };

  // Filtrer les films par le même genre que le film actuel (mais exclure le film actuel)
  const similarFilms = films
    .filter(
      (film) =>
        film.id !== detailFilm.id &&
        film.genre.some((genre) => detailFilm.genre.includes(genre))
    )
    .slice(0, 6);
  // Obtenir des films populaires (triés par note, excluant le film actuel)
  const popularFilms = [...films]
    .filter((film) => film.id !== detailFilm.id)
    .sort((a, b) => b.note - a.note)
    .slice(0, 6);

  // Obtenez des films spé (triés par note, excluant le film actuel)
  const dramaFilms = films
    .filter((film) => film.id !== detailFilm.id && film.genre.includes("Drame"))
    .slice(0, 6);
  return (
    <div className="md:w-2/3 flex-1">
      <div className="mt-8">
        <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
          Ça pourrait vous intéresser
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {similarFilms.slice(0, 4).map((film) => (
            <Card
              key={film.id}
              film={film}
              onClick={handleFilmClick}
              currentFilmId={detailFilm.id}
            />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
            Films populaires
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {popularFilms.map((film) => (
              <Card
                key={film.id}
                film={film}
                onClick={handleFilmClick}
                currentFilmId={detailFilm.id}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold mb-4 text-sm uppercase text-black dark:text-gray-400">
            Films Drame
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {dramaFilms.map((film) => (
              <Card
                key={film.id}
                film={film}
                onClick={handleFilmClick}
                currentFilmId={detailFilm.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
