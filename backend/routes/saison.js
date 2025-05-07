const express = require("express");
const router = express.Router();
const {
  getSaisonsBySerie,
  getSaisonByNumero,
  addSaison,
} = require("../controllers/saison-controller");

// Routes pour les saisons
router.get("/:id", getSaisonsBySerie);
router.get("/:id/:numero", getSaisonByNumero);
router.post("/:id", addSaison);

module.exports = router;