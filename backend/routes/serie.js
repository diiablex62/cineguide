const express = require("express");
const router = express.Router();
const {
  //   getAllSeries,
  //   getSerieById,
  //   createSerie,
  getSerieById,
  getAllSeries,
  importMultipleSeries,
} = require("../controllers/serie-controller");

// Routes pour les séries
router.get("/", getAllSeries);
// router.get("/import", importMultipleSeries);
router.get("/:id", getSerieById);
// router.post('/postserie', createSerie);

// Récupérer une série par son ID MongoDB
// router.get("/:id", getSerieById);

// Récupérer toutes les séries
// router.get("/", getAllSeries);

module.exports = router;
