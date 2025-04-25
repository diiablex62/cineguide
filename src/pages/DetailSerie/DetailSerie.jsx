import React from "react";

export default function DetailSerie() {
  return (
    <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-poppins">
      <nav className="py-2">
        <div className="flex  space-x-2 px-4 py-4 overflow-x-auto">
          <button className="bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1  text-sm">
            Episodes
          </button>
          <button className="bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1  text-sm">
            Résumé
          </button>
          <button className=" bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1  text-sm">
            Bandes-annonces
          </button>
          <button className=" bg-fuchsia hover:bg-fuchsia-hover text-white  px-3 py-1  text-sm">
            Programmes similaires
          </button>
          <button className=" bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1  text-sm">
            Commentaire
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row-reverse gap-6">
          <div className="md:w-64 flex-shrink-0">
            <div className="p-3 mb-6">
              <div className="bg-gray-800 mb-3 w-full h-44  relative">
                <img
                  src="/api/placeholder/240/176"
                  alt="Reacher"
                  className="w-full h-full object-cover "
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-2">
                  <p className="text-white font-bold">REACHER</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-start">
                <div>
                  <p className="text-sm font-bold">REACHER (2022)</p>
                </div>
                <div className="flex mt-1">
                  {[1, 2, 3].map((star, index) => star)}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-700  flex items-center text-sm">
                  <span>Listes</span>
                </button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-700  flex items-center text-sm">
                  <span>Tout vu</span>
                </button>
              </div>
              <div className="mt-4 text-xs flex justify-center w-full">
                <button className="py-2 w-full text-center border border-gray-300 dark:border-gray-700 ">
                  Connectez-vous pour synchroniser la Watchlist
                </button>
              </div>
            </div>

            <div className="mb-6 px-3 ">
              <div className="flex md:flex-col">
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">GENRES</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Action & Aventure, Drame, Crime & Thriller, Mystère &
                    Thriller
                  </p>
                </div>
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">DURÉE</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    48min
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 px-3">
              <div className="flex  md:flex-col">
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">ÂGE</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">18</p>
                </div>
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">PAYS DE PRODUCTION</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    États-Unis
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="font-bold mb-4 text-sm">4 SAISONS</h2>
              <div className="flex overflow-x-auto space-x-6 pb-2">
                {[1, 2, 3, 4].map((season) => (
                  <div key={season} className="flex flex-col items-center">
                    <div className="w-20 h-28 bg-gray-800 "></div>
                    <span className="mt-1 text-xs font-semibold">
                      Saison {season}
                    </span>
                    <span className="text-xs text-gray-500">
                      {8 + season} épisodes
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-8">
              {[
                { ep: "S2E3", title: "Affaires inachevées" },
                { ep: "S2E7", title: "Histoire S.L.A." },
                { ep: "S2E8", title: "De la fumée pour l'eau" },
              ].map((episode, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 dark:border-gray-700 py-3 flex justify-between items-center"
                >
                  <span className="text-sm">
                    {episode.ep} - {episode.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="font-bold mb-3 text-sm">RÉSUMÉ</h2>
              <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                Les forces de Los Angeles luttent le jour sur le pied ferme
                d'une Team Scorpion. L'histoire d'un véritable major des Forces
                intelligences, Les membres de cette formation sont personnage
                d'une mission qui requiert un niveau intellectuel hors du
                commun. Son fondateur, Walter O'Brien recrute des personnes avec
                un QI élevé afin de créer la meilleure team défensive pour
                protéger les américains contre des menaces complexes. Il rejoint
                le travail en 2016 pour Paige Dineen De Block, basé sous le
                chefet de la même nom.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="font-bold mb-3 text-sm">
                VIDÉOS: TRAILER, TEASER, BANDES-ANNONCES
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <div className="bg-gray-800 w-44 h-24  flex items-center justify-center"></div>
                  <div className="absolute bottom-0 left-0 w-full bg-fuchsia hover:bg-fuchsia-hover text-white text-xs p-1">
                    BANDE-ANNONCE OFFICIELLE VOST
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gray-800 w-44 h-24  flex items-center justify-center"></div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-bold mb-3 text-sm">CASTING</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Juan Avila",
                  "Corbett Douglas",
                  "Walter O'Brien",
                  "Jimmy Barnes",
                  "Sylvester Richemont",
                  "Elyes Bachir",
                  "Albert Solm",
                  "Caroline Friederich",
                ].map((actor) => (
                  <div
                    key={actor}
                    className="bg-gray-200 dark:bg-gray-800  px-2 py-1 text-xs"
                  >
                    {actor}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
