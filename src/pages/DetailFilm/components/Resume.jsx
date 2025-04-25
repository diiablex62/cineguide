import React, { useState } from "react";


export default function Resume() {
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
    
  return (
    <div className="md:w-2/3 flex-1">
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-400">
          Résumé
        </h2>
        <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
          {detailFilm.synopsis}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-400">
          Casting
        </h2>
        <div className="flex flex-wrap gap-2">
          {detailFilm.acteurs.map((actor) => (
            <div
              key={actor}
              className="bg-gray-200 dark:bg-gray-800 px-3 py-1 text-xs rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              {actor}
            </div>
          ))}
        </div>
      </div>
    </div></div>
  );
}
