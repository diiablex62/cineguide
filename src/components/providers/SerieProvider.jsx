import React, { useState } from "react";

import { SerieContext } from "../../context/SerieContext";
import SerieData from "../../data/Serie.json";

export default function SerieProvider({ children }) {
  const [goSeeStates, setGoSeeStates] = useState(false);
  const [alreadySeenStates, setAlreadySeenStates] = useState([]);
  const [openInfoStates, setOpenInfoStates] = useState({});

  const [serie, setSerie] = useState(SerieData);
  const [serieSeen, setSerieSeen] = useState([]);

  // A chaque fois qu'un utilsateur utilise un boutton d'un serie il s'adapte son setter change

  function toggleState(setter, id) {
    id = id;
    setter((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    // Il ajoute ensuite le film dans un table différente de celle global et supprime le film
    // si il existe deja (cela veux dire qu'il le retire de sa "list deja vu")
    if (serieSeen.some((serie) => serie.id === id)) {
      setSerieSeen((prev) => prev.filter((serie) => serie.id !== id));
    } else {
      const SerieToAdd = SerieData.find((serie) => serie.id === id);
      if (SerieToAdd) {
        setSerieSeen((prev) => [...prev, SerieToAdd]);
      }
    }
    console.log(alreadySeenStates);
  }

  // Affiche tout les series
  function allSerie() {
    setSerie(SerieData);
  }

  // Affiche les series par plateform
  function filterPlatform(value) {
    setSerie(
      SerieData.filter((serie) =>
        serie.platforms.some((platform) => value.includes(platform))
      )
    );
  }

  // Affiche les series par langue
  function filterLanguage(value) {
    setSerie(
      SerieData.filter((serie) =>
        serie.langues.some((langue) => value.includes(langue))
      )
    );
  }

  // Affiche les series par genre
  function filterGender(value) {
    setSerie(
      SerieData.filter((serie) =>
        serie.genre.some((genre) => value.includes(genre))
      )
    );
  }

  // Affiche les series deja vu
  function filterAlreadySeen() {
    setSerie(serieSeen);
  }

  // Affiche les series que j'ai pas vu
  function filterNotSeen() {
    setSerie(
      SerieData.filter(
        (serie) => !serieSeen.some((seenSerie) => seenSerie.id === serie.id)
      )
    );
  }

  // Affiche les series par mot clès
  function searchSerie(value) {
    value = String(value).toLowerCase();
    setSerie(
      SerieData.filter(
        (serie) => serie.titre && serie.titre.toLowerCase().includes(value)
      )
    );
  }
  const [detailSerie, setDetailSerie] = useState({
    id: 0,
    titre: "Chargement...",
    synopsis: "Chargement des informations de la série...",
    image: "https://via.placeholder.com/300x450?text=Chargement...",
    acteurs: [],
    note: 0,
    dateDebut: "",
    dateFin: "",
    createur: "",
    bandeAnnonce: "",
    genre: [],
    paysProduction: [],
    platforms: [],
    langues: [],
    dureeEpisodeMoyenne: "",
    saisons: [],
  });

  return (
    <SerieContext.Provider
      value={{
        serie,
        goSeeStates,
        alreadySeenStates,
        openInfoStates,
        toggleState,
        setGoSeeStates,
        setAlreadySeenStates,
        setOpenInfoStates,
        filterPlatform,
        filterGender,
        filterLanguage,
        filterAlreadySeen,
        filterNotSeen,
        searchSerie,
        allSerie,
        detailSerie,
        setDetailSerie,
      }}
    >
      {children}
    </SerieContext.Provider>
  );
}
