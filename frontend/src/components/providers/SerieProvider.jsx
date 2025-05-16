import React, { useEffect, useState } from "react";
import { SerieContext } from "../../context/SerieContext";
import { getAllSeries, getSerieById } from "../../apis/serie.api";
import { getSaisonsBySerie } from "../../apis/saison.api";
import { getEpisodesBySaison } from "../../apis/episode.api";

export default function SerieProvider({ children }) {
  const [goSeeStates, setGoSeeStates] = useState({});
  const [alreadySeenStates, setAlreadySeenStates] = useState({});
  const [openInfoStates, setOpenInfoStates] = useState({});
  const [series, setSeries] = useState([]);
  const [filteredSeries, setFilteredSeries] = useState([]);
  const [seriesSeen, setSeriesSeen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    async function fetchSeries() {
      setLoading(true);
      try {
        const seriesData = await getAllSeries();
        setSeries(seriesData);
        setFilteredSeries(seriesData);
        setError(null);
      } catch (error) {
        setError(
          "Impossible de charger les séries. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, []);

  const loadSerieDetails = async (id) => {
    if (!id) return;

    setLoading(true);
    try {
      const serieDetails = await getSerieById(id);

      const saisonsCompletes = [];

      if (serieDetails.saisons && Array.isArray(serieDetails.saisons)) {
        for (const saison of serieDetails.saisons) {
          const saisonNumero =
            typeof saison === "object" ? saison.numero : saison;

          try {
            const episodes = await getEpisodesBySaison(id, saisonNumero);

            saisonsCompletes.push({
              ...saison,
              episodes: episodes || [],
            });
          } catch (episodeError) {
            saisonsCompletes.push({
              ...saison,
              episodes: [],
            });
          }
        }
      }

      setDetailSerie({
        ...serieDetails,
        saisons:
          saisonsCompletes.length > 0
            ? saisonsCompletes
            : serieDetails.saisons || [],
      });

      setError(null);
    } catch (error) {
      setError(
        `Impossible de charger les détails de la série. Veuillez réessayer plus tard.`
      );
    } finally {
      setLoading(false);
    }
  };

  function toggleState(setter, id) {
    if (!id && id !== 0) return;

    setter((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (setter === setAlreadySeenStates) {
      setSeriesSeen((prev) => {
        if (prev.some((serie) => serie.id === id)) {
          return prev.filter((serie) => serie.id !== id);
        } else {
          const serieToAdd = series.find((serie) => serie.id === id);
          return serieToAdd ? [...prev, serieToAdd] : prev;
        }
      });
    }
  }

  function allSeries() {
    setFilteredSeries(series);
  }

  function filterPlatform(value) {
    const platformArray = Array.isArray(value) ? value : [value];

    setFilteredSeries(
      series.filter(
        (serie) =>
          serie.platforms &&
          serie.platforms.some((platform) => platformArray.includes(platform))
      )
    );
  }

  function filterLanguage(value) {
    const languageArray = Array.isArray(value) ? value : [value];

    setFilteredSeries(
      series.filter(
        (serie) =>
          serie.langues &&
          serie.langues.some((langue) => languageArray.includes(langue))
      )
    );
  }

  function filterGender(value) {
    const genderArray = Array.isArray(value) ? value : [value];

    setFilteredSeries(
      series.filter(
        (serie) =>
          serie.genre &&
          serie.genre.some((genre) => genderArray.includes(genre))
      )
    );
  }

  function filterAlreadySeen() {
    setFilteredSeries(seriesSeen);
  }

  function filterNotSeen() {
    setFilteredSeries(
      series.filter(
        (serie) => !seriesSeen.some((seenSerie) => seenSerie.id === serie.id)
      )
    );
  }

  function searchSerie(value) {
    if (!value) {
      setFilteredSeries(series);
      return;
    }

    const searchTerm = String(value).toLowerCase();
    setFilteredSeries(
      series.filter(
        (serie) => serie.titre && serie.titre.toLowerCase().includes(searchTerm)
      )
    );
  }

  return (
    <SerieContext.Provider
      value={{
        series,
        filteredSeries,
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
        allSeries,
        detailSerie,
        setDetailSerie,
        loadSerieDetails,
        seriesSeen,
        loading,
        error,
      }}
    >
      {children}
    </SerieContext.Provider>
  );
}
