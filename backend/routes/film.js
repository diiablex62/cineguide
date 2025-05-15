const router = require("express").Router();
const { add, getAll } = require("../controllers/film-controller");

router.post("/add", add);
router.get("/getAll", getAll);

module.exports = router;
