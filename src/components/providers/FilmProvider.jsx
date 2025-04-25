import React, { useState } from "react";

import { FilmContext } from "../../context/FilmContext";
import FilmData from "../../data/Film.json";

export default function FilmProvider({ children }) {
  const [goSeeStates, setGoSeeStates] = useState({});
  const [alreadySeenStates, setAlreadySeenStates] = useState({});
  const [openInfoStates, setOpenInfoStates] = useState({});

  const [film, setFilm] = useState(FilmData);
  function toggleState(setter, index) {
    setter((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  function allMovie() {
    setFilm(FilmData);
  }

  function filtrePlatform(value) {
    setFilm(
      FilmData.filter((film) =>
        film.platforms.some((platform) => value.includes(platform))
      )
    );
  }

  function filtreGenre(value) {
    setFilm(
      FilmData.filter((film) =>
        film.genre.some((genre) => value.includes(genre))
      )
    );
  }

  function searchMovie(value) {
    value = String(value).toLowerCase();

    setFilm(
      FilmData.filter(
        (film) => film.titre && film.titre.toLowerCase().includes(value)
      )
    );
  }

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
        filtrePlatform,
        filtreGenre,
        searchMovie,
        allMovie,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}
