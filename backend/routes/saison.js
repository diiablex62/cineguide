const express = require("express");
const router = express.Router();
const {
  // getSaisonsBySerie,
  getSaisonByNumero,
  // addSaison,
  getAllSaisons,
  getSaisonById,
} = require("../controllers/saison-controller");

// Routes pour les saisons
// router.get("/:id/saisons", getSaisonsBySerie);
router.get("/:id/saisons/:numero", getSaisonByNumero);
// router.post("/:id", addSaison);

// Récupérer toutes les saisons (optionnel)
router.get("/", getAllSaisons);

// Récupérer une saison par ID avec épisodes
router.get("/:id", getSaisonById);

module.exports = router;
