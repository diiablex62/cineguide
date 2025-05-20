const Episode = require("../models/episode.schema");
const { getSeasonDetails } = require("../services/tmdb");

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

// // Ajouter un épisode
// const createEpisode = async (req, res) => {
//   try {
//     const serieId = req.params._id;
//     const saisonNumero = req.params.saisonNumero;

//     const serie = await Serie.findById(serieId);

//     if (!serie) {
//       return res.status(404).json({ message: 'Série non trouvée' });
//     }

//     const saison = await Saison.findOne({
//       serie: serieId,
//       numero: saisonNumero
//     });

//     if (!saison) {
//       return res.status(404).json({ message: 'Saison non trouvée' });
//     }

//     const episode = new Episode({
//       ...req.body,
//       saison: saison._id
//     });

//     const newEpisode = await episode.save();

//     // Mettre à jour la référence dans la saison
//     saison.episodes.push(newEpisode._id);
//     await saison.save();

//     res.status(201).json(newEpisode);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = {getEpisodesBySaison, createEpisode};

const createEpisodeForSaison = async (saisonDoc, numeroSaison) => {
  try {
    const seasonData = await getSeasonDetails(
      saisonDoc.IdSerieTmdb,
      numeroSaison
    );
    if (!seasonData) return; // ← saison introuvable, on ne continue pas
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
