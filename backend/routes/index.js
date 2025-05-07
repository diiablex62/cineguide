const router = require("express").Router();

const apiFilms = require("./film.route");

router.use("/films", apiFilms);

module.exports = router;
