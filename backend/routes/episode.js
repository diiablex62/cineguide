const express = require("express");
const router = express.Router();
const {
  getEpisodesBySaison,

  createEpisode,
} = require("../controllers/episode-controller");

// Routes pour les épisodes
// Ces routes seront préfixées par "/api/episodes" dans app.js
router.get("/:id/saisons/:saisonNumero/episodes", getEpisodesBySaison);

router.post("/:id/saisons/:saisonNumero/episodes", createEpisode);

module.exports = router;