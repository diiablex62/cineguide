const express = require("express");
const router = express.Router();
const { searchAll } = require("../controllers/search-controller");

// Route pour la recherche globale
router.get("/", searchAll);

module.exports = router;
