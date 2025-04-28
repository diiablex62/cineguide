import React, { useState } from "react";

import { FilmContext } from "../../context/FilmContext";
import FilmData from "../../data/Film.json";

export default function FilmProvider({ children }) {
  const [goSeeStates, setGoSeeStates] = useState(false);
  const [alreadySeenStates, setAlreadySeenStates] = useState([]);
  const [openInfoStates, setOpenInfoStates] = useState({});

  const [film, setFilm] = useState(FilmData);
  const [filmSeen, setFlmSeen] = useState([]);

  // A chaque fois qu'un utilsateur utilise un boutton d'un film il s'adapte son setter change

  function toggleState(setter, id) {
    id = id;
    setter((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    // Il ajoute ensuite le film dans un table différente de celle global et supprime le film
    // si il existe deja (cela veux dire qu'il le retire de sa "list deja vu")
    if (filmSeen.some((film) => film.id === id)) {
      setFlmSeen((prev) => prev.filter((film) => film.id !== id));
    } else {
      const filmToAdd = FilmData.find((film) => film.id === id);
      if (filmToAdd) {
        setFlmSeen((prev) => [...prev, filmToAdd]);
      }
    }
    console.log(alreadySeenStates);
  }

  // Affiche tout les film
  function allMovie() {
    setFilm(FilmData);
  }

  // Affiche les films par plateform
  function filterPlatform(value) {
    setFilm(
      FilmData.filter((film) =>
        film.platforms.some((platform) => value.includes(platform))
      )
    );
  }

  // Affiche les films par langue
  function filterLanguage(value) {
    setFilm(
      FilmData.filter((film) =>
        film.langues.some((langue) => value.includes(langue))
      )
    );
  }

  // Affiche les films par genre
  function filterGender(value) {
    setFilm(
      FilmData.filter((film) =>
        film.genre.some((genre) => value.includes(genre))
      )
    );
  }

  // Affiche les films deja vu
  function filterAlreadySeen() {
    setFilm(filmSeen);
  }

  // Affiche les films que j'ai pas vu
  function filterNotSeen() {
    setFilm(
      FilmData.filter(
        (film) => !filmSeen.some((seenFilm) => seenFilm.id === film.id)
      )
    );
  }

  // Affiche les films par mot clès
  function searchMovie(value) {
    value = String(value).toLowerCase();
    setFilm(
      FilmData.filter(
        (film) => film.titre && film.titre.toLowerCase().includes(value)
      )
    );
  }
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

  return (
    <FilmContext.Provider
      value={{
        film,
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
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}
