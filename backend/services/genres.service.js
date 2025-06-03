const Genre = require("../models/genres.schema");

const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const getFilmGenres = async () => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_TOKEN}&language=fr-FR`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Erreur lors de la récupération des genres de films:", error);
    throw error;
  }
};

const getSerieGenres = async () => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/genre/tv/list?api_key=${TMDB_API_TOKEN}&language=fr-FR`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des genres de séries:",
      error
    );
    throw error;
  }
};

const syncGenres = async () => {
  try {
    // Récupérer les genres de films
    const filmGenres = await getFilmGenres();
    for (const genre of filmGenres) {
      await Genre.findOneAndUpdate(
        { id: genre.id },
        { ...genre, type: "film" },
        { upsert: true, new: true }
      );
    }

    // Récupérer les genres de séries
    const serieGenres = await getSerieGenres();
    for (const genre of serieGenres) {
      await Genre.findOneAndUpdate(
        { id: genre.id },
        { ...genre, type: "serie" },
        { upsert: true, new: true }
      );
    }

    return { success: true, message: "Genres synchronisés avec succès" };
  } catch (error) {
    console.error("Erreur lors de la synchronisation des genres:", error);
    throw error;
  }
};

module.exports = {
  getFilmGenres,
  getSerieGenres,
  syncGenres,
};
