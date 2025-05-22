const express = require("express");
const router = express.Router();
const { getSimilarToPeakyBlinders, getImageUrl } = require("../services/tmdb");

// Route pour récupérer les séries similaires à Peaky Blinders
router.get("/", async (req, res) => {
  try {
    const similarSeries = await getSimilarToPeakyBlinders();

    // Formater les données pour correspondre à votre structure
    const formattedSeries = similarSeries.slice(0, 6).map((item) => ({
      id: item.id,
      titre: item.name,
      image: getImageUrl(item.poster_path),
      note: item.vote_average,
      dateSortie: item.first_air_date,
      type: "tv",
      synopsis: item.overview,
    }));

    res.json(formattedSeries);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séries similaires:",
      error
    );
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des séries similaires",
      });
  }
});

module.exports = router;
