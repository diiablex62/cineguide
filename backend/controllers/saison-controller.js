const Saison = require('../models/saison.schema');
const Serie = require('../models/serie.schema');

// Récupérer toutes les saisons d'une série
const getSaisonsBySerie = async (req, res) => {
  try {
    const serieId = req.params.id;
    
    const serie = await Serie.findById(serieId);
    
    if (!serie) {
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    
    const saisons = await Saison.find({ serie: serieId }).select('-episodes');
    res.status(200).json(saisons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une saison spécifique
const getSaisonByNumero = async (req, res) => {
  try {
    const serieId = req.params.id;
    
    const serie = await Serie.findById(serieId);
    
    if (!serie) {
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    
    const saison = await Saison.findOne({
      serie: serieId,
      numero: req.params.numero
    }).populate('episodes');
    
    if (!saison) {
      return res.status(404).json({ message: 'Saison non trouvée' });
    }
    
    res.status(200).json(saison);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une saison
const addSaison = async (req, res) => {
  try {
    const serieId = req.params.id;
    
    const serie = await Serie.findById(serieId);
    
    if (!serie) {
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    
    const saison = new Saison({
      ...req.body,
      serie: serieId
    });
    
    const newSaison = await saison.save();
    
    // Mettre à jour la référence dans la série
    serie.saisons.push(newSaison._id);
    await serie.save();
    
    res.status(201).json(newSaison);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSaisonsBySerie, getSaisonByNumero, addSaison };