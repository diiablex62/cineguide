const Serie = require("../models/serie.schema");

// Récupérer toutes les séries
const getAllSeries = async (req, res) => {
  try {
    const series = await Serie.find().select("-saisons");
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une série par ID
const getSerieById = async (req, res) => {
  try {
    // Recherche par ID ou par l'attribut id
    const serie = await Serie.findOne({ 
      $or: [
        { _id: req.params.id }, 
        { id: req.params.id }
      ]
    }).populate({
      path: "saisons",
      select: "numero annee nbEpisodes",
    });

    if (!serie) {
      return res.status(404).json({ message: "Série non trouvée" });
    }

    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer une nouvelle série
const createSerie = async (req, res) => {
  try {
    const serie = new Serie(req.body);
    const newSerie = await serie.save();
    res.status(201).json(newSerie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllSeries, getSerieById, createSerie };
