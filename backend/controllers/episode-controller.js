const Episode = require("../models/episode.schema");
const Serie = require("../models/serie.schema");
const Saison = require("../models/saison.schema");
const { getSeasonDetails } = require("../services/tmdb");

// Récupérer tous les épisodes d'une saison
const getEpisodesBySaison = async (req, res) => {
  try {
    const serieId = req.params.id;
    const saisonNumero = parseInt(req.params.saisonNumero);

    console.log(`Recherche des épisodes pour série ${serieId}, saison ${saisonNumero}`);

    // Recherche par ID ou par l'attribut id
    const serie = await Serie.findOne({
      $or: [
        { _id: serieId },
        { id: serieId }
      ]
    });

    if (!serie) {
      console.log(`Série non trouvée avec ID: ${serieId}`);
      return res.status(404).json({ message: 'Série non trouvée' });
    }

    console.log(`Série trouvée: ${serie.titre || serie.name}, ID: ${serie._id}`);

    // Essayer différentes façons de trouver la saison
    let saison = await Saison.findOne({
      serie: serie._id,
      numero: saisonNumero
    });

    // Si pas trouvé, essayer avec d'autres champs possibles
    if (!saison) {
      saison = await Saison.findOne({
        IdSerieMongo: serie._id,
        numero: saisonNumero
      });
    }

    // Si toujours pas trouvé, essayer avec le champ season_number
    if (!saison) {
      saison = await Saison.findOne({
        $or: [
          { serie: serie._id },
          { IdSerieMongo: serie._id }
        ],
        $or: [
          { numero: saisonNumero },
          { season_number: saisonNumero }
        ]
      });
    }

    if (!saison) {
      // Debug: lister toutes les saisons pour cette série
      const allSaisons = await Saison.find({
        $or: [
          { serie: serie._id },
          { IdSerieMongo: serie._id }
        ]
      });
      
      console.log(`Aucune saison ${saisonNumero} trouvée pour la série ${serie._id}`);
      console.log(`Saisons disponibles pour cette série:`, allSaisons.map(s => ({
        id: s._id,
        numero: s.numero,
        season_number: s.season_number,
        serie: s.serie,
        IdSerieMongo: s.IdSerieMongo
      })));
      
      return res.status(404).json({ 
        message: 'Saison non trouvée',
        debug: {
          serieId: serie._id,
          saisonNumero,
          availableSeasons: allSaisons.map(s => s.numero || s.season_number)
        }
      });
    }

    console.log(`Saison trouvée: ${saison._id}, numéro: ${saison.numero || saison.season_number}`);

    // Chercher les épisodes avec différentes possibilités de référence
    let episodes = await Episode.find({ saison: saison._id });
    
    if (episodes.length === 0) {
      episodes = await Episode.find({ IdSaisonMongo: saison._id });
    }

    if (episodes.length === 0) {
      episodes = await Episode.find({ 
        NumeroSaison: saisonNumero,
        $or: [
          { saison: saison._id },
          { IdSaisonMongo: saison._id }
        ]
      });
    }

    console.log(`${episodes.length} épisodes trouvés pour la saison ${saisonNumero}`);

    res.status(200).json(episodes);
  } catch (error) {
    console.error('Error in getEpisodesBySaison:', error);
    res.status(500).json({ message: error.message });
  }
};

const createEpisodeForSaison = async (saisonDoc, numeroSaison) => {
  try {
    const seasonData = await getSeasonDetails(
      saisonDoc.IdSerieTmdb,
      numeroSaison
    );
    if (!seasonData) return;
    const episodes = seasonData.episodes || [];

    for (const ep of episodes) {
      const synopsis =
        ep.overview && ep.overview.trim() !== ""
          ? ep.overview
          : "Synopsis indisponible.";
      const duree = ep.runtime ? `${ep.runtime} min` : "Durée inconnue";
      const dateDiffusion = ep.air_date
        ? new Date(ep.air_date).toString()
        : "N/A";

      const episodeDoc = new Episode({
        numero: ep.episode_number,
        titre: ep.name || `Épisode ${ep.episode_number}`,
        synopsis,
        duree,
        dateDiffusion,
        IdSaisonMongo: saisonDoc._id,
        NumeroSaison: numeroSaison,
        saison: saisonDoc._id, // Ajouter aussi cette référence pour compatibilité
      });

      await episodeDoc.save();
      saisonDoc.episodes.push(episodeDoc._id);
    }
    await saisonDoc.save();

    console.log(
      `✅ ${episodes.length} épisodes ajoutés à la saison ${numeroSaison}`
    );
  } catch (error) {
    console.error(
      `❌ Erreur lors de la création des épisodes pour la saison ${numeroSaison}:`,
      error
    );
  }
};

/**
 * Récupérer un épisode par son ID
 */
const getEpisodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findById(id).populate("saison");
    if (!episode) return res.status(404).json({ error: "Episode non trouvé" });
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupérer tous les épisodes (exemple simple)
 */
const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find();
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEpisodeForSaison,
  getEpisodeById,
  getAllEpisodes,
  getEpisodesBySaison,
};