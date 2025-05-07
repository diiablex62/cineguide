const { add, getAll } = require("../controllers/film-controller");

const router = require("express").Router();

router.post("/add", add);
router.get("/getAll", getAll);

module.exports = router;
