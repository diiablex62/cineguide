import React, { useState, useEffect, useRef } from "react";
import { searchAll } from "../../apis/search.api";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fermer les résultats si clic en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Recherche avec debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length >= 3) {
        handleSearch();
      } else {
        setResults(null);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      console.log("Recherche de:", searchTerm);
      setIsLoading(true);
      setResults(null); // Réinitialiser les résultats avant la recherche

      const data = await searchAll(searchTerm);
      console.log("Résultats complets reçus:", data);
      if (data.acteurs && data.acteurs.length > 0) {
        console.log("Acteurs trouvés:", data.acteurs);
      }
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Erreur de recherche:", error);
      // Afficher un résultat d'erreur fictif pour que l'utilisateur sache qu'il y a un problème
      setResults({
        films: [],
        series: [],
        saisons: [],
        episodes: [],
        acteurs: [],
        error: true,
      });
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemClick = (type, id) => {
    setShowResults(false);
    switch (type) {
      case "film":
        navigate(`/detailfilm/${id}`);
        break;
      case "serie":
        navigate(`/series/${id}`);
        break;
      case "saison":
        navigate(`/series/${id.serie}`);
        break;
      case "episode":
        navigate(`/series/${id.saison ? id.saison.serie : id.serie}`);
        break;
      case "acteur":
        console.log("Navigation vers acteur:", id);
        navigate(`/acteurs/${id.id || id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className='relative w-full' ref={searchRef}>
      <div className='flex justify-between items-center w-full border border-black p-2 dark:border-white'>
        <input
          type='text'
          placeholder='Rechercher un film, une série, un acteur ...'
          className='w-full outline-none placeholder:text-gray-500 dark:placeholder:text-white dark:bg-black'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchOutline
          className='dark:text-white cursor-pointer'
          onClick={handleSearch}
        />
      </div>

      {showResults && results && (
        <div className='absolute mt-1 w-full bg-white dark:bg-black shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50'>
          {results.error && (
            <div className='p-4 text-center text-red-500'>
              Impossible de se connecter au serveur. Veuillez réessayer plus
              tard.
            </div>
          )}

          {!results.error && results.films && results.films.length > 0 && (
            <div className='p-2'>
              <h3 className='text-sm font-bold text-gray-700 dark:text-white'>
                Films
              </h3>
              {results.films.map((film) => (
                <div
                  key={film._id}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-black dark:text-white'
                  onClick={() => handleItemClick("film", film._id)}>
                  {film.titre}
                </div>
              ))}
            </div>
          )}

          {!results.error && results.series && results.series.length > 0 && (
            <div className='p-2'>
              <h3 className='text-sm font-bold text-gray-700 dark:text-white'>
                Séries
              </h3>
              {results.series.map((serie) => (
                <div
                  key={serie._id}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-black dark:text-white'
                  onClick={() => handleItemClick("serie", serie._id)}>
                  {serie.titre}
                </div>
              ))}
            </div>
          )}

          {!results.error && results.saisons && results.saisons.length > 0 && (
            <div className='p-2'>
              <h3 className='text-sm font-bold text-gray-700 dark:text-white'>
                Saisons
              </h3>
              {results.saisons.map((saison) => (
                <div
                  key={saison._id}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-black dark:text-white'
                  onClick={() =>
                    handleItemClick("saison", { serie: saison.serie._id })
                  }>
                  {saison.titre} - {saison.serie.titre}
                </div>
              ))}
            </div>
          )}

          {!results.error &&
            results.episodes &&
            results.episodes.length > 0 && (
              <div className='p-2'>
                <h3 className='text-sm font-bold text-gray-700 dark:text-white'>
                  Épisodes
                </h3>
                {results.episodes.map((episode) => (
                  <div
                    key={episode._id}
                    className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-black dark:text-white'
                    onClick={() =>
                      handleItemClick("episode", { saison: episode.saison })
                    }>
                    {episode.titre}
                  </div>
                ))}
              </div>
            )}

          {!results.error && results.acteurs && results.acteurs.length > 0 && (
            <div className='p-2'>
              <h3 className='text-sm font-bold text-gray-700 dark:text-white'>
                Acteurs
              </h3>
              {results.acteurs.map((acteur) => (
                <div
                  key={acteur._id}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-black dark:text-white'
                  onClick={() => handleItemClick("acteur", acteur)}>
                  {acteur.nom}
                </div>
              ))}
            </div>
          )}

          {!results.error &&
            (!results.films || results.films.length === 0) &&
            (!results.series || results.series.length === 0) &&
            (!results.saisons || results.saisons.length === 0) &&
            (!results.episodes || results.episodes.length === 0) &&
            (!results.acteurs || results.acteurs.length === 0) && (
              <div className='p-4 text-center text-gray-500 dark:text-gray-400'>
                Aucun résultat trouvé
              </div>
            )}
        </div>
      )}
    </div>
  );
}
