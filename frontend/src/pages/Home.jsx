import React, { useContext, useCallback, useEffect, useState } from "react";
import Netflix from "../components/home/Netflix";
import Primevideo from "../components/home/Primevideo";
import Disney from "../components/home/Disney";
import Hulu from "../components/home/hulu";
import peakyBg from "../assets/peaky2.jpg";
import { HomeContext } from "../context/HomeContext";
import { NavLink } from "react-router-dom";
import useGenres from "../hooks/useGenres";

export default function Home() {
  const { genres } = useContext(HomeContext);

  const { genres: genresFromAPI, loading: genresLoading } = useGenres();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTypes, setSelectedTypes] = useState({
    movie: false,
    tv: false,
  });
  const [selectedNote, setSelectedNote] = useState("");
  const [errors, setErrors] = useState({});
  const [trending, setTrending] = useState([]);
  const [series, setSeries] = useState([]);
  const [filteredResult, setFilteredResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(true);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trending");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des tendances");
        }
        const data = await response.json();
        setTrending(data);
        setSeries(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des tendances:", error);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, genre: false }));
    }
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    if (Object.values(selectedTypes).some((value) => value)) {
      setErrors((prev) => ({ ...prev, type: false }));
    }
  };

  const handleNoteChange = (e) => {
    setSelectedNote(e.target.value);
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, note: false }));
    }
  };

  const handleSearch = () => {
    const newErrors = {
      genre: !selectedGenre,
      type: !Object.values(selectedTypes).some((value) => value),
      note: false,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Filtrage des résultats correspondants aux critères
    const matchingResults = series.filter((item) => {
      const matchesGenre = item.genre_ids.includes(parseInt(selectedGenre));
      const matchesType = selectedTypes[item.media_type];
      const matchesNote =
        !selectedNote || item.vote_average >= parseInt(selectedNote);

      return matchesGenre && matchesType && matchesNote;
    });

    // Sélection aléatoire parmi les résultats
    if (matchingResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingResults.length);
      setFilteredResult(matchingResults[randomIndex]);
    } else {
      setFilteredResult("no_results");
    }
  };

  return (
    <div className='p-10 bg-white dark:bg-black'>
      <div className='mt-10 dark:bg-black px-6 rounded-lg text-center'>
        <h1 className='text-2xl font-semibold mb- text-gray-900 dark:text-white'>
          Tous vos films et séries préférées au même endroit
        </h1>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          Parcourez, recherchez et regardez la télévision et les films de plus
          de 300 services.
        </p>
        <div className='flex justify-center items-center gap-4 flex-wrap'>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Netflix className='h-full w-auto' />
          </div>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Primevideo className='h-full w-auto' />
          </div>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Disney className='h-full w-auto' />
          </div>
          <div className='h-12 bg-white p-2 rounded shadow'>
            <Hulu className='h-full w-auto' />
          </div>
          <span className='text-lg font-medium text-gray-600 dark:text-gray-300'>
            et bien d'autres
          </span>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold mb-4 text-left dark:text-white'>
          Top 10 cette semaine
        </h2>
        <div className='relative w-[70%] mx-auto md:h-[15rem]'>
          <div className='hidden md:flex gap-20 h-full overflow-x-auto overflow-y-hidden scroll-snap-x pl-10 pr-52 scrollbar-hide'>
            {loading ? (
              <div className='flex items-center justify-center w-full'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
              </div>
            ) : (
              trending.map((item, index) => (
                <NavLink
                  className='cursor-pointer'
                  to={`/${
                    item.type === "movie" ? "detailfilm" : "detailserie"
                  }/${item.id}`}
                  key={item.id}>
                  <div className='relative flex-shrink-0 w-40 h-60 bg-gray-200 dark:bg-black rounded-lg shadow scroll-snap-align-start group'>
                    <div className='absolute bottom-[-50px] left-[-25px] transform -translate-x-1/2 text-[8rem] font-bold text-gray-800 dark:text-white'>
                      {index + 1}
                    </div>
                    <img
                      src={item.image}
                      alt={item.titre}
                      className='w-full h-full object-cover rounded-lg relative z-10'
                    />
                    <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg z-20'></div>
                    <h3 className='absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-center z-30'>
                      {item.titre}
                    </h3>
                  </div>
                </NavLink>
              ))
            )}
          </div>
          {/* Version mobile */}
          <div className='md:hidden flex flex-col gap-4 -mx-10'>
            {loading ? (
              <div className='flex items-center justify-center w-full'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
              </div>
            ) : (
              trending.map((item, index) => (
                <NavLink
                  className='cursor-pointer'
                  to={`/${
                    item.type === "movie" ? "detailfilm" : "detailserie"
                  }/${item.id}`}
                  key={item.id}>
                  <div className='flex h-24 bg-gray-200 dark:bg-black'>
                    <div className='relative w-[20%]'>
                      <div className='absolute bottom-[20px] left-[-40px] text-5xl font-bold text-gray-800 dark:text-white'>
                        {index + 1}
                      </div>
                      <img
                        src={item.image}
                        alt={item.titre}
                        className='h-full w-full object-cover relative z-10'
                      />
                    </div>
                    <div className='flex-1 p-4 flex items-center'>
                      <h3 className='font-bold text-gray-800 dark:text-gray-200'>
                        {item.titre}
                      </h3>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>
          <div className='hidden md:block absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white via-white to-transparent dark:from-black dark:via-black pointer-events-none z-10'></div>
        </div>
      </div>

      {/* Section 3 */}
      <div className='mt-10 bg-white dark:bg-black'>
        <h2 className='text-xl font-bold mb-4 text-left text-black dark:text-white -mx-10 md:mx-0 px-4 md:px-0'>
          Meilleures séries Action
        </h2>
        <div className='flex overflow-x-auto scrollbar-hide -mx-10 md:mx-0 px-4 md:px-0'>
          <div className='flex gap-2'>
            {loadingAction ? (
              <div className='flex items-center justify-center w-full'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
              </div>
            ) : (
              series.map((serie) => (
                <NavLink
                  className='cursor-pointer'
                  to={`/detailserie/${serie.id}`}
                  key={serie.id}>
                  <div className='relative flex-shrink-0 w-40 h-60 group'>
                    <img
                      src={serie.image}
                      alt={serie.titre}
                      className='w-full h-full object-cover rounded-lg'
                    />
                    <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg'></div>
                    <h3 className='absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-center'>
                      {serie.titre}
                    </h3>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Section 4 - Peaky Blinders */}
      <div
        className='mt-20 relative h-[55vh] bg-cover bg-bottom bg-no-repeat overflow-hidden'
        style={{
          backgroundImage: `url(${peakyBg})`,
          backgroundPosition: "50% 25%",
          boxShadow: "inset 0px -400px 150px -50px rgba(0,0,0,0.9)",
        }}>
        <div className='absolute inset-0 flex flex-col items-center justify-center px-4'>
          <h2 className='text-2xl text-white text-center mb-2 bg-black/30 px-1 py-1'>
            Parce que vous aimez "Peaky Blinders"
          </h2>
          <div className='flex overflow-x-auto scrollbar-hide max-w-full'>
            <div className='flex gap-4 px-4'>
              {loadingSimilar ? (
                <div className='flex items-center justify-center w-full'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-fuchsia)]'></div>
                </div>
              ) : (
                series.map((serie) => (
                  <NavLink
                    className='cursor-pointer'
                    to={`/detailserie/${serie.id}`}
                    key={serie.id}>
                    <div className='relative flex-shrink-0 w-40 h-60 group'>
                      <img
                        src={serie.image}
                        alt={serie.titre}
                        className='w-full h-full object-cover rounded-lg'
                      />
                      <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg'></div>
                      <h3 className='absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-bold text-center'>
                        {serie.titre}
                      </h3>
                    </div>
                  </NavLink>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section On regarde quoi ce soir */}
      <div className='mt-20 bg-white dark:bg-black'>
        <h2 className='text-2xl font-bold text-black dark:text-white mb-8'>
          On regarde quoi ce soir ?
        </h2>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Colonne de gauche - Filtres */}
          <div className='w-full md:w-1/2 space-y-6 flex flex-col items-center'>
            <div className='space-y-4 w-[50%]'>
              <div className='w-[80%]'>
                {errors.genre && (
                  <p className='text-red-500 dark:text-red-400 text-sm mb-2'>
                    Veuillez sélectionner un genre
                  </p>
                )}
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  GENRE :
                </label>
                <select
                  className='w-full p-2 border border-black dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white'
                  value={selectedGenre}
                  onChange={handleGenreChange}>
                  <option value='' className='bg-white dark:bg-black'>
                    Sélectionnez un genre
                  </option>
                  {genresFromAPI.map((genre) => (
                    <option
                      key={genre.id}
                      value={genre.id}
                      className='bg-white dark:bg-black'>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

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

              <div className='w-[80%]'>
                {errors.note && (
                  <p className='text-red-500 dark:text-red-400 text-sm mb-2'>
                    Veuillez sélectionner une note
                  </p>
                )}
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  NOTE MINIMALE :
                </label>
                <select
                  className='w-full p-2 border border-black dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white'
                  value={selectedNote}
                  onChange={handleNoteChange}>
                  <option value='' className='bg-white dark:bg-black'>
                    Sélectionnez une note
                  </option>
                  <option value='8' className='bg-white dark:bg-black'>
                    8/10 et plus
                  </option>
                  <option value='7' className='bg-white dark:bg-black'>
                    7/10 et plus
                  </option>
                  <option value='6' className='bg-white dark:bg-black'>
                    6/10 et plus
                  </option>
                </select>
              </div>

              <div className='w-full flex justify-center mt-4'>
                <button
                  onClick={handleSearch}
                  className='bg-[var(--color-fuchsia)] text-white py-2 px-8 rounded hover:bg-[var(--color-fuchsia-hover)] whitespace-nowrap'>
                  TROUVER UN FILM
                </button>
              </div>
            </div>
          </div>

          {/* Colonne droite - Résultat */}
          <div className='w-full md:w-1/2 bg-white dark:bg-black rounded-lg p-6 border border-black dark:border-gray-700'>
            {filteredResult === "no_results" ? (
              <div className='flex flex-col items-center justify-center h-full text-center p-8'>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>
                  Aucun{" "}
                  {selectedTypes.movie && !selectedTypes.tv
                    ? "film"
                    : !selectedTypes.movie && selectedTypes.tv
                    ? "série"
                    : "film ou série"}{" "}
                  ne correspond à vos critères 😕
                </p>
                <p className='text-gray-500 dark:text-gray-400'>
                  Essayez de modifier vos filtres pour obtenir plus de résultats
                </p>
              </div>
            ) : filteredResult ? (
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='hidden md:block flex-shrink-0'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${filteredResult.poster_path}`}
                    alt={filteredResult.title || filteredResult.name}
                    className='w-32 h-48 object-cover rounded'
                    style={{ minWidth: "128px" }}
                  />
                </div>
                <div className='flex flex-col justify-between w-full'>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                      {filteredResult.title || filteredResult.name}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 text-sm mt-2'>
                      {new Date(
                        filteredResult.release_date ||
                          filteredResult.first_air_date
                      ).getFullYear()}{" "}
                      · Note: {filteredResult.vote_average.toFixed(1)} ·
                      {filteredResult.episode_run_time
                        ? `${filteredResult.episode_run_time[0]} min par épisode`
                        : `${filteredResult.runtime} min`}
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 mt-4'>
                      {filteredResult.overview}
                    </p>
                  </div>
                  <div className='flex gap-2 mt-4'>
                    <button className='bg-[var(--color-fuchsia)] text-white px-4 py-2 rounded'>
                      À voir
                    </button>
                    <button className='bg-green-600 text-white px-4 py-2 rounded'>
                      Déjà vu
                    </button>
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
    </div>
  );
}
