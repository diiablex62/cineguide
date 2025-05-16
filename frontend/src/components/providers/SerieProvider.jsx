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
  const [serie, setSerie] = useState([]); // Pour stocker toutes les séries disponibles

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
        setSerie(seriesData); // Stocker toutes les séries pour les recommandations
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

  // Fonction optimisée pour charger les détails d'une série
  const loadSerieDetails = async (id) => {
    if (!id) return;
    
    // Vérifier si on est déjà en train de charger la même série
    if (detailSerie.id && String(detailSerie.id) === String(id) && !loading) {
      return; // Éviter les chargements multiples pour la même série
    }

    setLoading(true);
    try {
      const serieDetails = await getSerieById(id);

      const saisonsCompletes = [];

      if (serieDetails.saisons && Array.isArray(serieDetails.saisons)) {
        // Traitement des saisons et épisodes en parallèle pour plus d'efficacité
        const saisonPromises = serieDetails.saisons.map(async (saison) => {
          const saisonNumero =
            typeof saison === "object" ? saison.numero : saison;

          try {
            const episodes = await getEpisodesBySaison(id, saisonNumero);
            return {
              ...saison,
              episodes: episodes || [],
            };
          } catch (episodeError) {
            console.error(`Erreur lors du chargement des épisodes de la saison ${saisonNumero}:`, episodeError);
            return {
              ...saison,
              episodes: [],
            };
          }
        });

        saisonsCompletes.push(...await Promise.all(saisonPromises));
      }

      // Normaliser les données de la série
      const normalizedSerie = {
        ...serieDetails,
        id: serieDetails.id || serieDetails._id, // S'assurer que l'ID est toujours défini
        acteurs: Array.isArray(serieDetails.acteurs) ? serieDetails.acteurs : [],
        genre: Array.isArray(serieDetails.genre) ? serieDetails.genre : [],
        paysProduction: Array.isArray(serieDetails.paysProduction) ? serieDetails.paysProduction : 
                        (serieDetails.paysProduction || "Non spécifié"),
        platforms: Array.isArray(serieDetails.platforms) ? serieDetails.platforms : [],
        langues: Array.isArray(serieDetails.langues) ? serieDetails.langues : [],
        bandeAnnonce: serieDetails.bandeAnnonce || "",
        saisons: saisonsCompletes.length > 0 ? saisonsCompletes : serieDetails.saisons || [],
      };

      setDetailSerie(normalizedSerie);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des détails de la série:", error);
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
        if (prev.some((serie) => String(serie.id) === String(id))) {
          return prev.filter((serie) => String(serie.id) !== String(id));
        } else {
          const serieToAdd = series.find((serie) => String(serie.id) === String(id));
          return serieToAdd ? [...prev, serieToAdd] : prev;
        }
      });
    }
  }

  function allSeries() {
    setFilteredSeries(series);
  }

  function filterPlatform(value) {
    if (!value) return allSeries();
    
    const platformArray = Array.isArray(value) ? value : [value];

    setFilteredSeries(
      series.filter(
        (serie) =>
          serie.platforms &&
          Array.isArray(serie.platforms) &&
          serie.platforms.some((platform) => platformArray.includes(platform))
      )
    );
  }

  function filterLanguage(value) {
    if (!value) return allSeries();
    
    const languageArray = Array.isArray(value) ? value : [value];

    setFilteredSeries(
      series.filter(
        (serie) =>
          serie.langues &&
          Array.isArray(serie.langues) &&
          serie.langues.some((langue) => languageArray.includes(langue))
      )
    );
  }

  function filterGender(value) {
    if (!value) return allSeries();
    
    const genderArray = Array.isArray(value) ? value : [value];

    setFilteredSeries(
      series.filter(
        (serie) =>
          serie.genre &&
          Array.isArray(serie.genre) &&
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
        (serie) => !seriesSeen.some((seenSerie) => String(seenSerie.id) === String(serie.id))
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
        serie, 
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