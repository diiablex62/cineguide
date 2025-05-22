const router = require("express").Router();
const {
  importActeursDepuisTMDB,
  getActeurs,
  enrichirActeursDepuisWikidata,
} = require("../controllers/acteur-controller");

// localhost:3000/api/acteurs

router.get("/", getActeurs);
router.get("/import", importActeursDepuisTMDB);
router.get("/wikidata", enrichirActeursDepuisWikidata);

module.exports = router;
