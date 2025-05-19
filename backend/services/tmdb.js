const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN; // Met ton token dans les variables d’environnement

if (!TMDB_API_TOKEN) {
  throw new Error("Le token TMDB_API_TOKEN est requis");
}

// Fonction générique pour faire une requête GET avec Bearer token
async function fetchFromTMDB(endpoint) {
  try {
    const url = `${TMDB_BASE_URL}${endpoint}${
      endpoint.includes("?") ? "&" : "?"
    }api_key=${TMDB_API_TOKEN}&language=fr-FR`;

    const response = await fetch(url);

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(`Erreur API TMDB: ${JSON.stringify(errData)}`);
    }
    const data = await response.json();
    return data; // Retourne bien les données JSON
  } catch (err) {
    console.error("Erreur API TMDB:", err.message);
    throw err;
  }
}

// API Séries
const getPopularSeries = async (page) => {
  return fetchFromTMDB(
    `discover/tv?sort_by=popularity.desc&page=${page}&with_origin_country=US`
  );
};

const getSeriesCredits = async (id) => {
  try {
    return await fetchFromTMDB(`tv/${id}/credits`);
  } catch (err) {
    const message = err.message || "";
    if (message.includes('status_code":34')) {
      console.warn(`⚠️ Credits de la série ${id} introuvable (TMDB 404).`);
      return null; // ← on retourne null si la série n'existe pas
    }
    console.error("Erreur API TMDB:", message);
    return null; // ← on retourne null pour toute autre erreur réseau/API aussi
  }
};

const getSerieDetails = async (id) => {
  try {
    return await fetchFromTMDB(`tv/${id}`);
  } catch (err) {
    const message = err.message || "";
    if (message.includes('status_code":34')) {
      console.warn(`⚠️ Série ${id} introuvable (TMDB 404).`);
      return null; // ← on retourne null si la série n'existe pas
    }
    console.error("Erreur API TMDB:", message);
    return null; // ← on retourne null pour toute autre erreur réseau/API aussi
  }
};

const getSeasonDetails = async (serieId, seasonNumber) => {
  try {
    return await fetchFromTMDB(`tv/${serieId}/season/${seasonNumber}`);
  } catch (err) {
    const message = err.message || "";
    if (message.includes('status_code":34')) {
      console.warn(
        `⚠️ Saison ${seasonNumber} non trouvée pour série ${serieId}, ignorée.`
      );
      return null; // ← on retourne null si la saison n'existe pas
    }
    throw err;
  }
};

const getSerieVideos = async (id) => fetchFromTMDB(`tv/${id}/videos`);

// API Films

const getPopularMovies = async (page) => {
  return fetchFromTMDB(
    `discover/movie?sort_by=popularity.desc&page=${page}&with_origin_country=US`
  );
};

const getMoviesCredits = async (id) => {
  try {
    return await fetchFromTMDB(`movie/${id}/credits`);
  } catch (err) {
    const message = err.message || "";
    if (message.includes('status_code":34')) {
      console.warn(`⚠️ Credits du film ${id} introuvable (TMDB 404).`);
      return null; // ← on retourne null si la série n'existe pas
    }
    console.error("Erreur API TMDB:", message);
    return null; // ← on retourne null pour toute autre erreur réseau/API aussi
  }
};

const getMovieDetails = async (id) => {
  try {
    return await fetchFromTMDB(`movie/${id}`);
  } catch (err) {
    const message = err.message || "";
    if (message.includes('status_code":34')) {
      console.warn(`⚠️ Film ${id} introuvable (TMDB 404).`);
      return null; // ← on retourne null si la série n'existe pas
    }
    console.error("Erreur API TMDB:", message);
    return null; // ← on retourne null pour toute autre erreur réseau/API aussi
  }
};

const getFilmVideos = async (id) => fetchFromTMDB(`movie/${id}/videos`);

const getMoviePlatforms = async (movieId) => {
  try {
    return await fetchFromTMDB(`movie/${movieId}/watch/providers`);
  } catch (err) {
    console.error("Erreur récupération plateformes:", err.message);
    return [];
  }
};

const getWeekTop = async (time) => {
  try {
    return await fetchFromTMDB(`trending/tv/${time}`);
  } catch (err) {
    console.error("Erreur récupération plateformes:", err.message);
    return [];
  }
};

module.exports = {
  getPopularSeries,
  getSerieDetails,
  getSeasonDetails,
  getSerieVideos,
  getSeriesCredits,
  getPopularMovies,
  getMoviesCredits,
  getMovieDetails,
  getFilmVideos,
  getMoviePlatforms,
  getWeekTop,
};
