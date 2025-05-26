const router = require("express").Router();
const {
  importActeursDepuisTMDB,
  getActeurs,
} = require("../controllers/acteur-controller");

// localhost:3000/api/acteurs

router.get("/", getActeurs);
router.get("/import", importActeursDepuisTMDB);

module.exports = router;
