import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Film from "./components/Film";

export default function DetailFilm() {
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
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-poppins">
      <nav className="py-2 sticky top-0 bg-white dark:bg-gray-900 z-10 shadow-md">
        <div className="flex  space-x-2 px-4 py-4 overflow-auto md:justify-center">
          <Link
            to={""}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Afficher tout
          </Link>
          <Link
            to={"resume"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Résumé
          </Link>
          <Link
            to={"bandeannonce"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Bandes-annonces
          </Link>
          <Link
            to={"filmproposer"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Films similaires
          </Link>
          <Link
            to={"commentaire"}
            className={`bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-xs md:text-lg transition-colors`}
          >
            Commentaires
          </Link>
        </div>
      </nav>

      <div className="w-full p-4">
        <div className="flex flex-col md:flex-row-reverse">
          <Film />
          <Outlet detailFilm={detailFilm} setDetailFilm={setDetailFilm} />
        </div>
      </div>
    </div>
  );
}
