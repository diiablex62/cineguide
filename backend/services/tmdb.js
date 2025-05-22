const TMDB_API_KEY = process.env.TMDB_API_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Récupérer les tendances de la semaine
const getTrending = async (mediaType = "all", timeWindow = "week") => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${TMDB_API_KEY}&language=fr-FR`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des tendances:",
      error.message
    );
    throw error;
  }
};

// Récupérer les détails d'un film
const getMovieDetails = async (id) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du film:",
      error.message
    );
    throw error;
  }
};

// Récupérer les détails d'une série
const getTvDetails = async (id) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`
    );
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la série:",
      error.message
    );
    throw error;
  }
};

// Formater l'URL de l'image
const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

module.exports = {
  getTrending,
  getMovieDetails,
  getTvDetails,
  getImageUrl,
};
