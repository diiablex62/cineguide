const Movie = require("../models/films.schema");
const {
  getMoviesCredits,
  getFilmVideos,
  getPopularMovies,
  getMovieDetails,
  getMoviePlatforms,
} = require("../services/tmdb");

// const add = async (req, res) => {
//   try {
//     // on insère le film en BDD
//     const film = await Film.create(req.body);

//     // on la retourne à l'application WEB
//     res.status(201).json(film);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getAll = async (req, res) => {
//   try {
//     // on récupére tout les films
//     const film = await Film.find();

//     // on la retourne à l'application WEB
//     res.status(200).json(film);
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { add, getAll };

async function createMovieWithDetails(details) {
  try {
    if (!details) {
      console.warn("⚠️ createMovieWithDetails ignorée : détails null");
      return;
    }
    const existing = await Movie.findOne({ tmdbId: details.id });
    if (existing) {
      console.log(`⏩ Film déjà existant : ${details.original_title}`);
      return;
    }
    const credits = details.credits ||
      (await getMoviesCredits(details.id)) || { cast: [] };
    const videos = (await getFilmVideos(details.id)) || "N/A";
    const trailer = videos.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.key
    );
    const dispo = await getMoviePlatforms(details.id);
    const frProviders = dispo.results?.FR?.flatrate || [];
    const film = new Movie({
      titre: details.original_title,
      synopsis: details.overview ? details.overview : "N/A",
      image: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : null,
      acteurs: credits.cast ? credits.cast.map((actor) => actor.name) : [],
      duree: details.runtime,
      note: details.vote_average,
      dateSortie: details.release_date,
      realisateur: credits.crew.filter((member) => member.job === "Producer")
        ? credits.crew
            .filter((member) => member.job === "Producer")
            .map((producer) => producer.name)
        : [],
      bandeAnnonce: trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : "N/A",
      genre: details.genres.map((g) => g.name),
      platforms: frProviders,
      paysProduction: details.origin_country || [],
      langues: details.spoken_languages?.map((l) => l.name) || [],
      tmdbId: details.id,
    });

    await film.save();

    if (!film || !film._id) {
      console.error("❌ Erreur sauvegarde film: filmDoc invalide");
      return;
    }
    console.log(`Film "${film.titre}" sauvegardée en base.`);
    return film;
  } catch (err) {
    console.error("Erreur sauvegarde film:", err.message);
    throw err;
  }
}

async function importMultipleSeries() {
  const pageMax = 3; // Limite pour tests
  let moviesCount = 0;

  for (let page = 1; page <= pageMax; page += 1) {
    console.log(`Chargement page ${page} de films...`);
    let discoverData;
    try {
      discoverData = await getPopularMovies(page);
      console.log("Réponse TMDB page", page, ":", discoverData);
    } catch (err) {
      console.error(
        `Erreur lors de la récupération des séries page ${page}:`,
        err.message
      );
      continue;
    }

    if (!discoverData || !Array.isArray(discoverData.results)) {
      console.log(`Pas de données à la page ${page}`);
      continue;
    }

    for (const movieSummary of discoverData.results) {
      try {
        console.log(
          `🟡 Import film ID: ${movieSummary.id} — Nom: ${movieSummary.original_title}`
        );
        const details = await getMovieDetails(movieSummary.id);
        if (!details) {
          console.warn(
            `⚠️ Film ${movieSummary.id} ignorée (détails introuvables).`
          );
          continue;
        }

        await createMovieWithDetails(details); // ← tu peux faire un return du film ici
        moviesCount++;
        console.log(`Film importée : ${details.original_title}`);
      } catch (err) {
        console.error(
          `Erreur chargement détails film ${movieSummary.id}:`,
          err.message
        );
      }
    }
  }

  console.log(`${moviesCount} films valides importées.`);
}

/**
 * Récupérer un film via son ID Mongo
 */
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Movie.findById(id);
    if (!film) return res.status(404).json({ error: "Film non trouvée" });
    res.json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupérer toutes les films (exemple simple)
 */
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllMovies, getMovieById, importMultipleSeries };
