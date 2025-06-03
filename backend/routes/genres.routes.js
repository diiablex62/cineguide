const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  getFilmGenresList,
  getSerieGenresList,
  syncGenresWithTMDB,
} = require("../controllers/genre-controller");

// Route pour récupérer tous les genres
router.get("/", getAllGenres);

// Route pour récupérer les genres de films
router.get("/films", getFilmGenresList);

// Route pour récupérer les genres de séries
router.get("/series", getSerieGenresList);

// Route pour synchroniser les genres avec TMDB
router.post("/sync", syncGenresWithTMDB);

module.exports = router;
