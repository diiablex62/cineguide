import React, { useState } from "react";

import { FilmContext } from "../../context/FilmContext";
import { useEffect } from "react";
import { getAll } from "../../apis/film.api"; // Adjust the path if necessary

export default function FilmProvider({ children }) {
  const [goSeeStates, setGoSeeStates] = useState(false);
  const [alreadySeenStates, setAlreadySeenStates] = useState([]);
  const [openInfoStates, setOpenInfoStates] = useState({});
  const [film, setFilm] = useState([]);
  const [filteredFilm, setFilteredFilm] = useState([]);
  const [filmSeen, setFilmSeen] = useState([]);
  const [detailFilm, setDetailFilm] = useState({
    id: 0,
    titre: "Chargement...",
    synopsis: "Chargement des informations du film...",
    image: "https://via.placeholder.com/300x450?text=Chargement...",
    acteurs: [],
    duree: "",
    note: 0,
    dateSortie: "",
    realisateur: "",
    bandeAnnonce: "",
    genre: [],
    paysProduction: [],
    platforms: [],
    langues: [],
  });

  // A chaque fois qu'un utilsateur utilise un boutton d'un film il s'adapte son setter change
  useEffect(() => {
    async function fetchFilms() {
      const films = await getAll();
      if (films) {
        setFilm(films);
        setFilteredFilm(films);
      }
    }
    fetchFilms();
  }, []);

  function toggleState(setter, id) {
    id = id;
    setter((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    // Il ajoute ensuite le film dans un table différente de celle global et supprime le film
    // si il existe deja (cela veux dire qu'il le retire de sa "list deja vu")
    if (filmSeen.some((film) => film._id === id)) {
      setFilmSeen((prev) => prev.filter((film) => film._id !== id));
    } else {
      const filmToAdd = film.find((film) => film._id === id);
      if (filmToAdd) {
        setFilmSeen((prev) => [...prev, filmToAdd]);
      }
    }
    console.log(alreadySeenStates);
  }

  // Affiche tout les film
  function allMovie() {
    setFilteredFilm(film);
  }

  // Affiche les films par plateform
  function filterPlatform(value) {
    setFilteredFilm(
      film.filter((film) =>
        film.platforms.some((platform) => value.includes(platform))
      )
    );
  }

  // Affiche les films par langue
  function filterLanguage(value) {
    setFilteredFilm(
      film.filter((film) =>
        film.langues.some((langue) => value.includes(langue))
      )
    );
  }

  // Affiche les films par genre
  function filterGender(value) {
    setFilteredFilm(
      film.filter((film) => film.genre.some((genre) => value.includes(genre)))
    );
  }

  // Affiche les films deja vu
  function filterAlreadySeen() {
    setFilteredFilm(filmSeen);
  }

  // Affiche les films que j'ai pas vu
  function filterNotSeen() {
    setFilteredFilm(
      film.filter(
        (film) => !filmSeen.some((seenFilm) => seenFilm._id === film._id)
      )
    );
  }

  // Affiche les films par mot clès
  function searchMovie(value) {
    value = String(value).toLowerCase();
    setFilteredFilm(
      film.filter(
        (film) => film.titre && film.titre.toLowerCase().includes(value)
      )
    );
  }

  return (
    <FilmContext.Provider
      value={{
        film,
        filteredFilm,
        goSeeStates,
        alreadySeenStates,
        openInfoStates,
        toggleState,
        setGoSeeStates,
        setAlreadySeenStates,
        setOpenInfoStates,
        filterPlatform,
        filterGender,
        searchMovie,
        allMovie,
        detailFilm,
        setDetailFilm,
        filterLanguage,
        filterAlreadySeen,
        filterNotSeen,
        filmSeen,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}
