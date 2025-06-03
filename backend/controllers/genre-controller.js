const Genre = require("../models/genres.schema");
const {
  getFilmGenres,
  getSerieGenres,
  syncGenres,
} = require("../services/genres.service");

// Récupérer tous les genres
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les genres de films
const getFilmGenresList = async (req, res) => {
  try {
    const genres = await Genre.find({ type: "film" });
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les genres de séries
const getSerieGenresList = async (req, res) => {
  try {
    const genres = await Genre.find({ type: "serie" });
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Synchroniser les genres avec TMDB
const syncGenresWithTMDB = async (req, res) => {
  try {
    const result = await syncGenres();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGenres,
  getFilmGenresList,
  getSerieGenresList,
  syncGenresWithTMDB,
};
