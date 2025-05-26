import React, { useEffect, useState, useCallback } from "react";
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
        
        // Vérifier que les données reçues sont bien un tableau
        if (Array.isArray(seriesData)) {
          setSeries(seriesData);
          setFilteredSeries(seriesData);
          setSerie(seriesData); // Stocker toutes les séries pour les recommandations
          setError(null);
        } else {
          console.error("Les données reçues ne sont pas un tableau:", seriesData);
          setError("Format de données incorrect reçu du serveur.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des séries:", error);
        setError(
          "Impossible de charger les séries. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchSeries();
  }, []);

  // Optimisation avec useCallback pour éviter des re-rendus inutiles
  const loadSerieDetails = useCallback(async (id) => {
    if (!id) return;
    
    // Vérifier si on est déjà en train de charger la même série
    if (detailSerie.id && String(detailSerie.id) === String(id) && !loading) {
      return; // Éviter les chargements multiples pour la même série
    }

    setLoading(true);
    try {
      const serieDetails = await getSerieById(id);
      if (!serieDetails) {
        throw new Error(`Série avec ID ${id} non trouvée`);
      }

      const saisonsCompletes = [];

      // Récupération des saisons si elles ne sont pas incluses dans les détails de la série
      let saisonsData = serieDetails.saisons;
      if (!saisonsData || !Array.isArray(saisonsData) || saisonsData.length === 0) {
        try {
          saisonsData = await getSaisonsBySerie(id);
        } catch (saisonError) {
          console.warn(`Impossible de récupérer les saisons pour la série ${id}:`, saisonError);
          saisonsData = [];
        }
      }

      if (Array.isArray(saisonsData) && saisonsData.length > 0) {
        // Traitement des saisons et épisodes en parallèle pour plus d'efficacité
        const saisonPromises = saisonsData.map(async (saison) => {
          // Si saison est un nombre ou une chaîne, convertir en objet avec numéro
          const saisonObj = typeof saison === "object" ? saison : { numero: saison };
          const saisonNumero = saisonObj.numero;

          if (!saisonNumero && saisonNumero !== 0) {
            console.warn("Saison sans numéro détectée:", saison);
            return saisonObj;
          }

          try {
            const episodes = await getEpisodesBySaison(id, saisonNumero);
            return {
              ...saisonObj,
              episodes: Array.isArray(episodes) ? episodes : []
            };
          } catch (episodeError) {
            console.error(`Erreur lors du chargement des épisodes de la saison ${saisonNumero}:`, episodeError);
            return {
              ...saisonObj,
              episodes: []
            };
          }
        });

        try {
          const resolvedSaisons = await Promise.all(saisonPromises);
          saisonsCompletes.push(...resolvedSaisons);
        } catch (parallelError) {
          console.error("Erreur lors du traitement parallèle des saisons:", parallelError);
        }
      }

      // Normaliser les données de la série
      const normalizedSerie = {
        ...serieDetails,
        _id: serieDetails._id || serieDetails.id, // S'assurer que _id est toujours défini
        id: serieDetails.id || serieDetails._id, // S'assurer que id est toujours défini
        acteurs: Array.isArray(serieDetails.acteurs) 
          ? serieDetails.acteurs.filter(acteur => acteur) // Filtrer les valeurs null/undefined
          : [],
        genre: Array.isArray(serieDetails.genre) 
          ? serieDetails.genre.filter(genre => genre) 
          : [],
        paysProduction: Array.isArray(serieDetails.paysProduction) 
          ? serieDetails.paysProduction 
          : [serieDetails.paysProduction].filter(Boolean),
        platforms: Array.isArray(serieDetails.platforms) 
          ? serieDetails.platforms.filter(platform => platform) 
          : [],
        langues: Array.isArray(serieDetails.langues) 
          ? serieDetails.langues.filter(langue => langue) 
          : [],
        bandeAnnonce: serieDetails.bandeAnnonce || "",
        saisons: saisonsCompletes.length > 0 
          ? saisonsCompletes 
          : (Array.isArray(serieDetails.saisons) ? serieDetails.saisons : [])
      };

      setDetailSerie(normalizedSerie);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des détails de la série:", error);
      setError(
        `Impossible de charger les détails de la série. Veuillez réessayer plus tard.`
      );
      
      // Réinitialiser les détails avec un état d'erreur pour éviter d'afficher des données incomplètes
      setDetailSerie({
        id: id,
        titre: "Erreur de chargement",
        synopsis: "Impossible de charger les informations de la série.",
        image: "https://via.placeholder.com/300x450?text=Erreur",
        acteurs: [],
        genre: [],
        paysProduction: [],
        platforms: [],
        langues: [],
        saisons: [],
      });
    } finally {
      setLoading(false);
    }
  }, [detailSerie.id, loading]);

  // Optimisation avec useCallback pour éviter des re-rendus inutiles
  const toggleState = useCallback((setter, id) => {
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
  }, [series]);

  // Fonctions de filtrage optimisées
  const allSeries = useCallback(() => {
    setFilteredSeries(series);
  }, [series]);

  const filterPlatform = useCallback((value) => {
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
  }, [series, allSeries]);

  const filterLanguage = useCallback((value) => {
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
  }, [series, allSeries]);

  const filterGender = useCallback((value) => {
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
  }, [series, allSeries]);

  const filterAlreadySeen = useCallback(() => {
    setFilteredSeries(seriesSeen);
  }, [seriesSeen]);

  const filterNotSeen = useCallback(() => {
    setFilteredSeries(
      series.filter(
        (serie) => !seriesSeen.some((seenSerie) => String(seenSerie.id) === String(serie.id))
      )
    );
  }, [series, seriesSeen]);

  const searchSerie = useCallback((value) => {
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
  }, [series]);

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