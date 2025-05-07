const Acteur = require("../models/acteur.schema");

const getActeurs = async (req, res) => {
  try {
    const acteurs = await Acteur.find();
    res.status(200).json(acteurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneActeur = async (req, res) => {
  try {
    const acteur = await Acteur.findById(req.params.id);
    if (!acteur) {
      res.status(500).json({ error: "Acteur introuvable" });
    } else {
      res.status(200).json(video);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateActeur = async (req, res) => {
  try {
    const acteur = await Acteur.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!acteur) {
      res.status(500).json({ error: "Acteur introuvable" });
    } else {
      res.status(200).json(acteur);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteActeur = async (req, res) => {
  try {
    const acteur = await Acteur.findByIdAndDelete(req.params.id);
    if (!acteur) {
      res.status(500).json({ error: "Acteur introuvable" });
    } else {
      res.status(200).json({ message: "Acteur supprimé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createActeur = async (req, res) => {
  try {
    const acteur = new Acteur(req.body);
    await acteur.save();
    res.status(200).json(acteur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getActeurs,
  getOneActeur,
  updateActeur,
  deleteActeur,
  createActeur,
};
