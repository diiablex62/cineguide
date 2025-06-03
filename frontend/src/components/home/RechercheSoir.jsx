import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaCheck, FaPlus, FaEye } from "react-icons/fa";
import useGenres from "../../hooks/useGenres";

/**
 * Composant principal pour la recherche et l'affichage de la suggestion du soir.
 * Utilisé dans Home.jsx
 */
export default function RechercheSoir({ movies, series }) {
  // Récupération des genres via le hook custom
  const { genres: genresFromAPI } = useGenres();

  // États pour les filtres
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    movie: false,
    tv: false,
  });
  const [selectedNote, setSelectedNote] = useState("");
  const [errors, setErrors] = useState({});

  // États pour la gestion des suggestions
  const [filteredResult, setFilteredResult] = useState(null);
  const [displayedItems, setDisplayedItems] = useState(new Set());
  const [alreadySeenStates, setAlreadySeenStates] = useState({});
  const [goSeeStates, setGoSeeStates] = useState({});

  /**
   * Réinitialise les suggestions affichées quand on change les filtres
   * Utilisé dans useEffect
   */
  useEffect(() => {
    setDisplayedItems(new Set());
    setFilteredResult(null);
  }, [selectedGenre, selectedTypes, selectedNote]);

  /**
   * Gère le changement de genre sélectionné
   * Utilisé dans le select des genres
   */
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  /**
   * Gère le changement de type (film/série)
   * Utilisé dans les checkboxes de type
   */
  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  /**
   * Gère le changement de note minimale
   * Utilisé dans le curseur de note
   */
  const handleNoteChange = (e) => {
    setSelectedNote(e.target.value);
  };

  /**
   * Filtre dynamiquement les genres selon le(s) type(s) sélectionné(s)
   * Utilisé dans le select des genres
   */
  const filteredGenres = genresFromAPI.filter((genre) => {
    if (selectedTypes.movie && selectedTypes.tv) return true;
    if (selectedTypes.movie) return genre.type === "film";
    if (selectedTypes.tv) return genre.type === "serie";
    return false;
  });

  /**
   * Gère la recherche et la suggestion d'un film/série selon les filtres
   * Utilisé sur le bouton 'CHERCHER'
   */
  const handleSearch = () => {
    const newErrors = {
      type: !Object.values(selectedTypes).some((value) => value),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }
    // Combiner les films et séries
    const allContent = [
      ...movies.map((movie) => ({ ...movie, type: "movie" })),
      ...series.map((serie) => ({ ...serie, type: "tv" })),
    ];
    // Filtrage des résultats
    const matchingResults = allContent.filter((item) => {
      const matchesGenre =
        !selectedGenre ||
        item.genre.some((genre) =>
          genre.toLowerCase().includes(selectedGenre.toLowerCase())
        );
      const matchesType = selectedTypes[item.type];
      let matchesNote = true;
      if (selectedNote) {
        const itemNote = parseFloat(item.note);
        const minNote = parseFloat(selectedNote);
        matchesNote = !isNaN(itemNote) && itemNote >= minNote;
      }
      return matchesGenre && matchesType && matchesNote;
    });
    // Éliminer les doublons
    const uniqueResults = Array.from(
      new Map(matchingResults.map((item) => [item._id, item])).values()
    );
    // Filtrer les résultats déjà affichés
    const availableResults = uniqueResults.filter(
      (item) => !displayedItems.has(item._id)
    );
    if (availableResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableResults.length);
      const selectedItem = availableResults[randomIndex];
      setDisplayedItems((prev) => new Set([...prev, selectedItem._id]));
      setFilteredResult(selectedItem);
    } else if (uniqueResults.length > 0) {
      setDisplayedItems(new Set());
      const randomIndex = Math.floor(Math.random() * uniqueResults.length);
      setFilteredResult(uniqueResults[randomIndex]);
    } else {
      setFilteredResult("no_results");
    }
  };

  /**
   * Bascule l'état 'déjà vu' pour un film/série
   * Utilisé sur le bouton 'Déjà vu'
   */
  const toggleState = (id) => {
    setAlreadySeenStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  /**
   * Bascule l'état 'à voir' (watchlist) pour un film/série
   * Utilisé sur le bouton 'À voir'
   */
  const toggleGoSee = (id) => {
    setGoSeeStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className='mt-20 bg-white dark:bg-black'>
      <h2 className='text-2xl font-bold text-black dark:text-white mb-8'>
        On regarde quoi ce soir ?
      </h2>
      <div className='flex flex-col md:flex-row gap-8'>
        {/* Colonne de gauche - Filtres */}
        <div className='w-full md:w-1/2 space-y-6 flex flex-col items-center'>
          <div className='space-y-4 w-[50%]'>
            {/* TYPE d'abord */}
            <div className='w-[80%]'>
              {errors.type && (
                <p className='text-red-500 dark:text-red-400 text-sm mb-2'>
                  Veuillez sélectionner au moins un type
                </p>
              )}
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                TYPE :
              </label>
              <div className='flex gap-4'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-[var(--color-fuchsia)] rounded border-gray-300 dark:border-gray-700'
                    checked={selectedTypes.movie}
                    onChange={() => handleTypeChange("movie")}
                  />
                  <span className='ml-2 text-gray-700 dark:text-gray-300'>
                    Film
                  </span>
                </label>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-[var(--color-fuchsia)] rounded border-gray-300 dark:border-gray-700'
                    checked={selectedTypes.tv}
                    onChange={() => handleTypeChange("tv")}
                  />
                  <span className='ml-2 text-gray-700 dark:text-gray-300'>
                    Série
                  </span>
                </label>
              </div>
            </div>
            {/* Puis GENRE */}
            <div className='w-[80%]'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                GENRE :
              </label>
              <select
                className='w-full p-2 border border-black dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white'
                value={selectedGenre}
                onChange={handleGenreChange}
                disabled={!selectedTypes.movie && !selectedTypes.tv}>
                <option value='' className='bg-white dark:bg-black'>
                  Tous les genres
                </option>
                {filteredGenres.map((genre) => (
                  <option
                    key={genre.id}
                    value={genre.name}
                    className='bg-white dark:bg-black'>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Curseur de note */}
            <div className='w-[80%]'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                NOTE MINIMALE (optionnel) :
              </label>
              <div className='flex flex-col gap-2'>
                <input
                  type='range'
                  min='0'
                  max='10'
                  step='1'
                  value={selectedNote}
                  onChange={handleNoteChange}
                  className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
                />
                <div className='flex justify-between text-sm text-gray-600 dark:text-gray-300'>
                  <span>0</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                  <span>10</span>
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  Note minimale sélectionnée :{" "}
                  {selectedNote ? selectedNote : "—"}
                </p>
              </div>
            </div>
            <div className='w-full flex justify-center mt-4'>
              <button
                onClick={handleSearch}
                className='bg-[var(--color-fuchsia)] text-white py-2 px-8 rounded hover:bg-[var(--color-fuchsia-hover)] whitespace-nowrap'>
                CHERCHER
              </button>
            </div>
          </div>
        </div>
        {/* Colonne droite - Résultat */}
        <div className='w-full md:w-1/2 bg-white dark:bg-black rounded-lg p-6 border border-black dark:border-gray-700'>
          {filteredResult === "no_results" ? (
            <div className='flex flex-col items-center justify-center h-full text-center p-8'>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                Aucun résultat ne correspond à vos critères 😕
              </p>
              <p className='text-gray-500 dark:text-gray-400'>
                Essayez de modifier vos filtres pour obtenir plus de résultats
              </p>
            </div>
          ) : filteredResult ? (
            <div className='flex flex-col md:flex-row gap-6'>
              <div className='hidden md:block flex-shrink-0'>
                <img
                  src={filteredResult.image}
                  alt={filteredResult.titre}
                  className='w-32 h-48 object-cover rounded'
                  style={{ minWidth: "128px" }}
                />
              </div>
              <div className='flex flex-col justify-between w-full'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                    {filteredResult.titre}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300 text-sm mt-2'>
                    {filteredResult.type === "tv"
                      ? `${new Date(
                          filteredResult.dateDebut
                        ).getFullYear()} - ${
                          filteredResult.dateFin
                            ? new Date(filteredResult.dateFin).getFullYear()
                            : "En cours"
                        } ${
                          filteredResult.genre &&
                          filteredResult.genre.length > 0
                            ? filteredResult.genre[0]
                            : ""
                        }`
                      : `${new Date(filteredResult.dateSortie).getFullYear()} ${
                          filteredResult.genre &&
                          filteredResult.genre.length > 0
                            ? filteredResult.genre[0]
                            : ""
                        }`}
                  </p>
                  <p className='text-gray-600 dark:text-gray-300 text-sm'>
                    {(() => {
                      const note = parseFloat(filteredResult.note).toFixed(1);
                      if (filteredResult.type === "tv") {
                        const duree =
                          filteredResult.dureeEpisodeMoyenne &&
                          filteredResult.dureeEpisodeMoyenne !== "Inconnue" &&
                          !isNaN(parseInt(filteredResult.dureeEpisodeMoyenne))
                            ? `${parseInt(
                                filteredResult.dureeEpisodeMoyenne
                              )} min`
                            : "";
                        return duree
                          ? `Note: ${note} · ${duree}`
                          : `Note: ${note}`;
                      } else {
                        return `Note: ${note} · ${filteredResult.duree} min`;
                      }
                    })()}
                  </p>
                  <p className='text-gray-700 dark:text-gray-300 mt-4'>
                    {filteredResult.synopsis}
                  </p>
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => toggleGoSee(filteredResult._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded text-white font-medium transition-colors duration-200 ${
                        goSeeStates[filteredResult._id]
                          ? "bg-gray-600"
                          : "bg-gray-800"
                      }`}>
                      {goSeeStates[filteredResult._id] ? (
                        <FaCheck className='text-white' />
                      ) : (
                        <FaPlus className='text-white' />
                      )}
                      {goSeeStates[filteredResult._id]
                        ? "Déjà ajouté"
                        : "À voir"}
                    </button>
                    <button
                      onClick={() => toggleState(filteredResult._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded text-white font-medium transition-colors duration-200 ${
                        alreadySeenStates[filteredResult._id]
                          ? "bg-green-600"
                          : "bg-red-400"
                      }`}>
                      <FaEye className='text-white' />
                      {alreadySeenStates[filteredResult._id]
                        ? "Déjà vu"
                        : "Pas encore vu"}
                    </button>
                  </div>
                  <NavLink
                    to={`/${
                      filteredResult.type === "movie"
                        ? "detailfilm"
                        : "detailserie"
                    }/${filteredResult._id}`}
                    className='mt-2 bg-[var(--color-fuchsia)] text-white px-4 py-2 rounded font-bold text-center w-full block'>
                    REGARDER MAINTENANT
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-full text-center p-8'>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                Pas d'inspiration pour ce soir ? 🎬
              </p>
              <p className='text-gray-500 dark:text-gray-400'>
                Utilisez les filtres et cliquez sur "TROUVER UN FILM" pour
                obtenir une suggestion personnalisée !
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
