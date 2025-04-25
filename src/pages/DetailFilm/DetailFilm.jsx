import React from "react";

export default function DetailFilm() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-poppins">
      <nav className="py-2">
        <div className="flex justify-center space-x-2 px-4 py-4 overflow-x-hidden">
          <button className="bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-sm">
            Résumé
          </button>
          <button className="bg-fuchsia hover:bg-fuchsia-hover text-white  px-3 py-1 text-sm">
            Bandes-annonces
          </button>
          <button className="bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-sm">
            Films similaires
          </button>
          <button className="bg-fuchsia hover:bg-fuchsia-hover text-white px-3 py-1 text-sm">
            Commentaires
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row-reverse gap-6">
          <div className="md:w-64 flex-shrink-0">
            <div className="p-3 mb-6">
              <div className="bg-gray-800 mb-3 w-full h-44 relative">
                <img
                  src="/api/placeholder/240/176"
                  alt="Inception"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-2">
                  <p className="text-white font-bold">INCEPTION</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-start">
                <div>
                  <p className="text-sm font-bold">INCEPTION (2010)</p>
                </div>
                <div className="flex mt-1">
                  {[1, 2, 3, 4].map((star, index) => star)}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 flex items-center text-sm">
                  <span>Listes</span>
                </button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 flex items-center text-sm">
                  <span>Vu</span>
                </button>
              </div>
              <div className="mt-4 text-xs flex justify-center w-full">
                <button className="py-2 w-full text-center border border-gray-300 dark:border-gray-700">
                  Connectez-vous pour synchroniser la Watchlist
                </button>
              </div>
            </div>

            <div className="mb-6 px-3">
              <div className="flex md:flex-col">
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">GENRES</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Science-Fiction, Action, Thriller
                  </p>
                </div>
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">DURÉE</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    2h 28min
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 px-3">
              <div className="flex md:flex-col">
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">ÂGE</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">12</p>
                </div>
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">PAYS DE PRODUCTION</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    États-Unis, Royaume-Uni
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 px-3">
              <div className="flex md:flex-col">
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">DATE DE SORTIE</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    21 juillet 2010
                  </p>
                </div>
                <div className="w-1/2">
                  <h3 className="font-bold text-sm mb-2">RÉALISATEUR</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Christopher Nolan
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <h2 className="font-bold mb-3 text-sm">RÉSUMÉ</h2>
              <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
                Dom Cobb est un voleur expérimenté, le meilleur dans l'art
                périlleux de l'extraction, voler les secrets les plus intimes
                enfouis au plus profond du subconscient durant une phase de
                rêve, lorsque l'esprit est le plus vulnérable. Les capacités de
                Cobb en ont fait un acteur très recherché dans ce monde troubles
                de l'espionnage industriel, mais elles ont aussi fait de lui un
                fugitif international qui a perdu tout ce qui lui était cher.
                Une ultime mission pourrait lui permettre de retrouver sa vie
                d'avant.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="font-bold mb-3 text-sm">
                VIDÉOS: TRAILER, TEASER, BANDES-ANNONCES
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <div className="bg-gray-800 w-44 h-24 flex items-center justify-center"></div>
                  <div className="absolute bottom-0 left-0 w-full bg-fuchsia hover:bg-fuchsia-hover text-white text-xs p-1">
                    BANDE-ANNONCE OFFICIELLE VOST
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gray-800 w-44 h-24 flex items-center justify-center"></div>
                  <div className="absolute bottom-0 left-0 w-full bg-fuchsia hover:bg-fuchsia-hover text-white text-xs p-1">
                    TEASER
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gray-800 w-44 h-24 flex items-center justify-center"></div>
                  <div className="absolute bottom-0 left-0 w-full bg-fuchsia hover:bg-fuchsia-hover text-white text-xs p-1">
                    EXTRAIT
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-bold mb-3 text-sm">CASTING</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Leonardo DiCaprio",
                  "Joseph Gordon-Levitt",
                  "Ellen Page",
                  "Tom Hardy",
                  "Ken Watanabe",
                  "Cillian Murphy",
                  "Marion Cotillard",
                  "Michael Caine",
                ].map((actor) => (
                  <div
                    key={actor}
                    className="bg-gray-200 dark:bg-gray-800 px-2 py-1 text-xs"
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
