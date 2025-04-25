import React, { useState } from "react";
import Resume from "./Resume";
import BandeAnnonce from "./BandeAnnonce";
import Commentaire from "./Commentaire";
import FilmProposer from "./FilmProposer";

export default function Tous() {
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
    <div className="md:w-2/3 flex-1 flex-col justify-center items-center">
      <Resume detailFilm={detailFilm} />
      <BandeAnnonce detailFilm={detailFilm} />
      <Commentaire />
      <FilmProposer detailFilm={detailFilm} setDetailFilm={setDetailFilm} />
    </div>
  );
}
