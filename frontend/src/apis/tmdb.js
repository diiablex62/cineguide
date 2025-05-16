const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjVjZGQ1M2E5YzU4YjJiM2I0NTdhNDg0NTJkMjJkNCIsIm5iZiI6MTcxMTcwNTkwMy45Niwic3ViIjoiNjYwNjhmMmZhNmRkY2IwMTdjNDUyMzFkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s8QWYZNzsxiVw-htVY0yA3xPBu4zUOJTmrJlGtyZiTc";
const BASE_URL = "https://api.themoviedb.org/3";

// Appel générique avec Bearer Token
async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  for (const key in params) {
    url.searchParams.set(key, params[key]);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Erreur TMDB (${response.status}): ${errorText}`);
    throw new Error(errorText);
  }

  return response.json();
}

// 🔹 Obtenir tout les films
export async function getAllMovies(maxPages = 1) {
  const allMovies = [];

  console.log(`🚀 Démarrage récupération des films (max ${maxPages} pages)...`);

  for (let page = 1; page <= maxPages; page++) {
    console.log(`📄 Page ${page}/${maxPages}`);

    const data = await fetchFromTMDB("discover/movie", {
      sort_by: "primary_release_date.lte",
      page,
    });

    if (!data?.results || data.results.length === 0) break;

    allMovies.push(...data.results);

    // Attente de 250ms entre les pages (évite d’être bloqué par rate limit)
    await new Promise((r) => setTimeout(r, 250));
  }

  // console.log(allMovies);
}

// 🔹 Obtenir les détails d’un film
export async function getMovieDetails(movieId) {
  return await fetchFromTMDB(`movie/${movieId}`);
}

// 🔹 Obtenir les acteurs (cast) d’un film
export async function getMovieCast(movieId) {
  const data = await fetchFromTMDB(`movie/${movieId}/credits`);
  return data?.cast || [];
}

// 🔹 Obtenir les détails d’un acteur
export async function getPersonDetails(personId) {
  return await fetchFromTMDB(`person/${personId}`);
}

// Récupérer les genres
export async function getGenres() {
  const movieGenres = await fetchFromTMDB("genre/movie/list");
  const tvGenres = await fetchFromTMDB("genre/tv/list");
  return {
    movie: movieGenres.genres || [],
    tv: tvGenres.genres || [],
  };
}

// 🔹 Obtenir toutes les séries
export async function getAllSeries(maxPages = 1) {
  const allSeries = [];

  console.log(`🚀 Démarrage récupération des films (max ${maxPages} pages)...`);

  for (let page = 1; page <= maxPages; page++) {
    console.log(`📄 Page ${page}/${maxPages}`);

    const data = await fetchFromTMDB("discover/tv", {
      sort_by: "first_air_date.lte",
      page,
    });

    if (!data?.results || data.results.length === 0) break;

    allSeries.push(...data.results);

    // Attente de 250ms entre les pages (évite d’être bloqué par rate limit)
    await new Promise((r) => setTimeout(r, 250));
  }

  // console.log(allSeries);
}

// 🔹 Obtenir les détails d’une série
export async function getSerieDetails(serieId) {
  return await fetchFromTMDB(`tv/${serieId}`);
}

// 🔹 Obtenir les acteurs (cast) d’une série
export async function getSerieCast(serieId) {
  const data = await fetchFromTMDB(`tv/${serieId}/credits`);
  return data?.cast || [];
}

// 🔹 Détails d’une saison (contient les épisodes)
export async function getSeasonDetails(serieId, seasonNumber) {
  return await fetchFromTMDB(`tv/${serieId}/season/${seasonNumber}`);
}

// 🔹 Obtenir toutes les saisons d’une série
export async function showSerieInfo(serieId) {
  const serie = await getSerieDetails(serieId);
  console.log("Titre série:", serie.name);

  // Affiche saisons
  serie.seasons.forEach((season) => {
    console.log(
      `Saison ${season.season_number} (${season.episode_count} épisodes)`
    );
  });

  // Récupère tout les épisodes de la saison 1
  const saison1 = await getSeasonDetails(serieId, 1);
  console.log(
    "Épisodes saison 1:",
    saison1.episodes.map((ep) => ep.name)
  );
}

// Récupérer un épisode en particulier
export async function getEpisodeDetails(serieId, seasonNumber, episodeNumber) {
  return await fetchFromTMDB(
    `tv/${serieId}/season/${seasonNumber}/episode/${episodeNumber}`
  );
}

// Main pour tester lancer le terminal dans /apis et faire node tmdb.js, ça va éxécuter le code en dessous
// (async () => {
//   try {
//     const details = await showSerieInfo(1399);
//     console.log(details);
//   } catch (e) {
//     console.error("Erreur:", e.message);
//   }
// })();
