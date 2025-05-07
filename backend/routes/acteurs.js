const router = require("express").Router();
const {
  getActeurs,
  getOneActeur,
  updateActeur,
  deleteActeur,
  createActeur,
} = require("../controllers/acteur-controller");

// localhost:3000/api/acteurs

router.get("/", getActeurs);

router.get("/:id", getOneActeur);
router.put("/:id", updateActeur);
router.delete("/:id", deleteActeur);
router.post("/", createActeur);

module.exports = router;
