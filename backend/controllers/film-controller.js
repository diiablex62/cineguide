const Film = require("../models/films.schema");

const add = async (req, res) => {
  try {
    // on insère le film en BDD
    const film = await Film.create(req.body);

    // on la retourne à l'application WEB
    res.status(201).json(film);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req, res) => {
  try {
    // on récupére tout les films
    const film = await Film.find();

    // on la retourne à l'application WEB
    res.status(200).json(film);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { add, getAll };
