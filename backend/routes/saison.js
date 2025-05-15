const express = require("express");
const router = express.Router();
const {
  getSaisonsBySerie,
  getSaisonByNumero,
  addSaison,
} = require("../controllers/saison-controller");

// Routes pour les saisons
router.get("/:id/saisons", getSaisonsBySerie);
router.get("/:id/saisons/:numero", getSaisonByNumero);
router.post("/:id", addSaison);

module.exports = router;