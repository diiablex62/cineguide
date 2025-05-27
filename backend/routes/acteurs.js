const router = require("express").Router();
const {
  importActeursDepuisTMDB,
  getActeurs,
  ajouterHF,
} = require("../controllers/acteur-controller");

// localhost:3000/api/acteurs

router.get("/", getActeurs);
// router.get("/import", importActeursDepuisTMDB);
// router.get("/genre", ajouterHF);

module.exports = router;
