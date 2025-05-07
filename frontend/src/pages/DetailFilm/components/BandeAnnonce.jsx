import React, { useContext, useState } from "react";
import { FilmContext } from "../../../context/FilmContext";

export default function BandeAnnonce() {
  const { detailFilm } = useContext(FilmContext);

  return (
    <div className="w-full flex-1">
      <div className="w-full text-center justify-center items-center">
        <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
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
      </div>
    </div>
  );
}
