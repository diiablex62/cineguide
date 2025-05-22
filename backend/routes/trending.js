const express = require("express");
const router = express.Router();
const { getTrending, getImageUrl } = require("../services/tmdb");

// Route pour récupérer les tendances
router.get("/", async (req, res) => {
  try {
    const trending = await getTrending("all", "week");

    // Formater les données pour correspondre à votre structure
    const formattedTrending = trending.slice(0, 10).map((item) => ({
      id: item.id,
      titre: item.title || item.name,
      image: getImageUrl(item.poster_path),
      note: item.vote_average,
      dateSortie: item.release_date || item.first_air_date,
      type: item.media_type,
      synopsis: item.overview,
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
