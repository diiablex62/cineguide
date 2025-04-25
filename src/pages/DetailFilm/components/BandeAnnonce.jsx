import React, { useState } from "react";


export default function BandeAnnonce() {
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
      <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-400">
        Vidéos: Trailer, Teaser, Bandes-annonces
      </h2>
      <div className="flex">
        <div className="relative w-full">
          <div className="bg-gray-800 w-full h-80 flex items-center justify-center  overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`${detailFilm.bandeAnnonce.replace("watch?v=", "embed/")}`}
              title="Bande-annonce officielle"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-fuchsia hover:bg-fuchsia-hover text-white text-xs p-2 text-center">
            BANDE-ANNONCE OFFICIELLE VOST
          </div>
        </div>
      </div>
    </div></div>
   
  );
}
