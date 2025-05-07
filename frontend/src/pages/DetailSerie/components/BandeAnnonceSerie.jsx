import React, { useContext } from "react";
import { SerieContext } from "../../../context/SerieContext";

export default function BandeAnnonce() {
  const { detailSerie } = useContext(SerieContext);
  return (
    <div className="w-full ">
      <div className="w-full text-center justify-center items-center">
        <h2 className="font-bold mb-3 text-sm uppercase text-black dark:text-gray-200">
          Vidéos: Trailer, Teaser, Bandes-annonces
        </h2>
        <div className="flex  justify-center items-center">
          <div className="relative w-full flex  justify-center items-center">
            <div className="bg-gray-800 w-full md:w-1/2 h-80 flex items-center justify-center  overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={`${detailSerie.bandeAnnonce.replace(
                  "watch?v=",
                  "embed/"
                )}`}
                title="Bande-annonce officielle"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
