const Episode = require('../models/episode.schema');
const Saison = require('../models/saison.schema');
const Serie = require('../models/serie.schema');

// Récupérer tous les épisodes d'une saison
const getEpisodesBySaison = async (req, res) => {
  try {
    const serieId = req.params.id; // Changement de _id à id
    const saisonNumero = req.params.saisonNumero;
    
  
    
    // Recherche par ID ou par l'attribut id
    const serie = await Serie.findOne({ 
      $or: [
        { _id: serieId }, 
        { id: serieId }
      ]
    });
    
    if (!serie) {
   
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    
   
    const saison = await Saison.findOne({
      serie: serie._id,
      numero: saisonNumero
    });
    
    if (!saison) {
     
      return res.status(404).json({ message: 'Saison non trouvée' });
    }
    
    
    
    const episodes = await Episode.find({ saison: saison._id });

    
    res.status(200).json(episodes);
  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
};


// Ajouter un épisode
const createEpisode = async (req, res) => {
  try {
    const serieId = req.params._id;
    const saisonNumero = req.params.saisonNumero;
    
    const serie = await Serie.findById(serieId);
    
    if (!serie) {
      return res.status(404).json({ message: 'Série non trouvée' });
    }
    
    const saison = await Saison.findOne({
      serie: serieId,
      numero: saisonNumero
    });
    
    if (!saison) {
      return res.status(404).json({ message: 'Saison non trouvée' });
    }
    
    const episode = new Episode({
      ...req.body,
      saison: saison._id
    });
    
    const newEpisode = await episode.save();
    
    // Mettre à jour la référence dans la saison
    saison.episodes.push(newEpisode._id);
    await saison.save();
    
    res.status(201).json(newEpisode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {getEpisodesBySaison, createEpisode};