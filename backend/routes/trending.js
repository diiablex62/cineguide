const express = require("express");
const router = express.Router();
const { getMovieTop, getTVTop } = require("../services/tmdb");
const { createMovieWithDetails } = require("../controllers/film-controller");
const { createSerieWithDetails } = require("../controllers/serie-controller");
const Movie = require("../models/films.schema");
const Serie = require("../models/serie.schema");

// Route pour récupérer les tendances
router.get("/movies", async (req, res) => {
  try {
    const trending = await getMovieTop("week");
    // console.log(trending.length);
    let moviesCount = 0;
    const allMovies = [];

    for (const oneMovie of trending) {
      try {
        await createMovieWithDetails(oneMovie);
        const DBMovie = await Movie.findOne({ tmdbId: String(oneMovie.id) });
        allMovies.push(DBMovie);
        moviesCount++;
        console.log(`Film importée : ${oneMovie.original_title}`);
      } catch (err) {
        console.error(
          `Erreur chargement détails film ${oneMovie.id}:`,
          err.message
        );
      }
    }
    console.log(`${moviesCount} films valides importées.`);

    // Formater les données pour correspondre à votre structure
    const formattedTrending = allMovies.slice(0, 20).map((item) => ({
      id: item._id,
      titre: item.titre,
      image: item.image,
    }));

    res.json(formattedTrending);
  } catch (error) {
    console.error("Erreur lors de la récupération des tendances:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tendances" });
  }
});

router.get("/tv", async (req, res) => {
  try {
    const trending = await getTVTop("week");
    // console.log(trending.length);
    let seriesCount = 0;
    const allSeries = [];

    for (const oneSerie of trending) {
      try {
        await createSerieWithDetails(oneSerie);
        const DBSerie = await Serie.findOne({ tmdbId: String(oneSerie.id) });
        allSeries.push(DBSerie);
        seriesCount++;
        console.log(`Série importée : ${oneSerie.name}`);
      } catch (err) {
        console.error(
          `Erreur chargement détails série ${oneSerie.id}:`,
          err.message
        );
      }
    }
    console.log(`${seriesCount} séries valides importées.`);

    // Formater les données pour correspondre à votre structure
    const formattedTrending = allSeries.slice(0, 20).map((item) => ({
      id: item._id,
      titre: item.titre,
      image: item.image,
    }));

    res.json(formattedTrending);
  } catch (error) {
    console.error("Erreur lors de la récupération des tendances:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tendances" });
  }
});

module.exports = router;
