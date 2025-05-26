const express = require("express");
const router = express.Router();
const { getTopActionSeries, getImageUrl } = require("../services/tmdb");

// Route pour récupérer les meilleures séries d'action
router.get("/", async (req, res) => {
  try {
    const actionSeries = await getTopActionSeries();

    // Formater les données pour correspondre à votre structure
    const formattedSeries = actionSeries.slice(0, 10).map((item) => ({
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
    console.error("Erreur lors de la récupération des séries d'action:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des séries d'action" });
  }
});

module.exports = router;
