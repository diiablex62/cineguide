const express = require("express");
const router = express.Router();
const {
  getEpisodesBySaison,
  // createEpisode,
  getEpisodeById,
  getAllEpisodes,
} = require("../controllers/episode-controller");

// Routes pour les épisodes
// Ces routes seront préfixées par "/api/episodes" dans app.js
router.get("/:id/saisons/:saisonNumero/episodes", getEpisodesBySaison);

// router.post("/:id/saisons/:saisonNumero/episodes", createEpisode);

// Récupérer tous les épisodes
router.get("/", getAllEpisodes);

// Récupérer un épisode par son ID MongoDB
router.get("/:id", getEpisodeById);

module.exports = router;
