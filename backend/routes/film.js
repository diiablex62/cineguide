const router = require("express").Router();
const {
  //   add,
  getAll,
  //   getAllMovies,
  importMultipleSeries,
  getMovieById,
  getAllMovies,
} = require("../controllers/film-controller");

// router.post("/add", add);
router.get("/getAll", getAll);
// router.get("/", getAllMovies);

router.get("/import", importMultipleSeries);

// Récupérer un film par son ID MongoDB
router.get("/:id", getMovieById);

// Récupérer tout les films
router.get("/", getAllMovies);

module.exports = router;
