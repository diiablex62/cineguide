const express = require("express");
const router = express.Router();
const Serie = require("../models/serie.schema");
const Film = require("../models/films.schema");
const Acteur = require("../models/acteur.schema");

// Route de recherche globale
router.get("/", async (req, res) => {
  try {
    scar;
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ message: "Le paramètre 'query' est requis" });
    }

    // Recherche insensible à la casse et aux accents
    const searchRegex = new RegExp(query, "i");

    // Recherche dans les séries avec plus de champs
    const series = await Serie.find({
      $or: [
        { titre: searchRegex },
        { synopsis: searchRegex },
        { createur: searchRegex },
        { genre: searchRegex },
        { acteurs: searchRegex },
      ],
    }).limit(5);

    // Recherche dans les films
    const films = await Film.find({
      $or: [
        { titre: searchRegex },
        { synopsis: searchRegex },
        { realisateur: searchRegex },
        { genre: searchRegex },
        { acteurs: searchRegex },
      ],
    }).limit(5);

    // Recherche dans les acteurs
    const acteurs = await Acteur.find({
      $or: [
        { nom: searchRegex },
        { prenom: searchRegex },
        { biographie: searchRegex },
      ],
    }).limit(5);

    console.log("Résultats de recherche:", {
      series: series.length,
      films: films.length,
      acteurs: acteurs.length,
    });

    res.json({
      series,
      films,
      acteurs,
      saisons: [], // À implémenter si nécessaire
      episodes: [], // À implémenter si nécessaire
    });
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    res.status(500).json({ message: "Erreur lors de la recherche" });
  }
});

module.exports = router;
