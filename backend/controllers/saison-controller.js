const Saison = require("../models/saison.schema");
const Serie = require("../models/serie.schema");
const { getSeasonDetails, getSerieDetails } = require("../services/tmdb");
const { createEpisodeForSaison } = require("./episode-controller");

// // Récupérer toutes les saisons d'une série
// const getSaisonsBySerie = async (req, res) => {
//   try {
//     const serieId = req.params.id; // Changement de _id à id

//     // Recherche par ID ou par l'attribut id
//     const serie = await Serie.findOne({
//       $or: [
//         { _id: serieId },
//         { id: serieId }
//       ]
//     });

//     if (!serie) {
//       return res.status(404).json({ message: 'Série non trouvée' });
//     }

//     const saisons = await Saison.find({ serie: serie._id }).select('-episodes');
//     res.status(200).json(saisons);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Récupérer une saison spécifique
// const getSaisonByNumero = async (req, res) => {
//   try {
//     const serieId = req.params.id; // Changement de _id à id
//     const saisonNumero = req.params.numero;

//     // Recherche par ID ou par l'attribut id
//     const serie = await Serie.findOne({
//       $or: [
//         { _id: serieId },
//         { id: serieId }
//       ]
//     });

//     if (!serie) {
//       return res.status(404).json({ message: 'Série non trouvée' });
//     }

//     const saison = await Saison.findOne({
//       serie: serie._id,
//       numero: saisonNumero
//     }).populate('episodes');

//     if (!saison) {
//       return res.status(404).json({ message: 'Saison non trouvée' });
//     }

//     res.status(200).json(saison);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Ajouter une saison
// const addSaison = async (req, res) => {
//   try {
//     const serieId = req.params._id;

//     const serie = await Serie.findById(serieId);

//     if (!serie) {
//       return res.status(404).json({ message: 'Série non trouvée' });
//     }

//     const saison = new Saison({
//       ...req.body,
//       serie: serieId
//     });

//     const newSaison = await saison.save();

//     // Mettre à jour la référence dans la série
//     serie.saisons.push(newSaison._id);
//     await serie.save();

//     res.status(201).json(newSaison);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { getSaisonsBySerie, getSaisonByNumero, addSaison };

const createSaisonForSerie = async (serieDoc) => {
  try {
    const serieDetails = await getSerieDetails(serieDoc.tmdbId); // tv/{id}
    const saisons = serieDetails.seasons || [];
    const saisonsCreees = [];

    for (const saison of saisons) {
      if (!saisons || !Array.isArray(saisons)) {
        console.warn(`⚠️ Aucune saison pour la série ${serieDoc.titre}`);
        return;
      }
      const numero = saison.season_number;

      if (numero == null || isNaN(numero) || numero === 0) {
        console.warn(
          `⚠️ Saison ${numero} ignorée (numéro invalide ou spéciale).`
        );
        continue;
      }

      // On récupère les vrais détails de la saison (y compris la date, le nb d’épisodes, etc.)
      let saisonDetails;
      try {
        saisonDetails = await getSeasonDetails(serieDoc.tmdbId, numero);
        if (!saisonDetails) continue; // déjà géré s’il y a erreur 34
      } catch (error) {
        console.warn(
          `⚠️ Saison ${numero} introuvable pour série ${serieDoc.titre} (id: ${tmdbSerieId})`
        );
        continue; // Ignore cette saison
      }

      const annee = saisonDetails.air_date
        ? new Date(saisonDetails.air_date).getFullYear().toString()
        : "N/A";

      const nbEpisodes = saisonDetails.episodes?.length || 0;

      const saisonDoc = new Saison({
        numero,
        annee,
        nbEpisodes,
        IdSerieMongo: serieDoc._id,
        IdSerieTmdb: serieDoc.tmdbId,
      });

      await saisonDoc.save();

      await createEpisodeForSaison(saisonDoc, numero);

      serieDoc.saisons.push(saisonDoc._id);
      saisonsCreees.push(saisonDoc);
    }

    await serieDoc.save();
    console.log(`✅ ${saisons.length} saisons créées pour ${serieDoc.titre}`);
    return saisonsCreees;
  } catch (error) {
    console.error(`❌ Erreur lors de la création des saisons :`, error);
  }
};

/**
 * Récupérer une saison par son ID
 */
const getSaisonById = async (req, res) => {
  try {
    const { id } = req.params;
    const saison = await Saison.findById(id)
      .populate("episodes")
      .populate("serie");
    if (!saison) return res.status(404).json({ error: "Saison non trouvée" });
    res.json(saison);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupérer toutes les saisons (exemple simple)
 */
const getAllSaisons = async (req, res) => {
  try {
    const saisons = await Saison.find();
    res.json(saisons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSaisonForSerie,
  getSaisonById,
  getAllSaisons,
};
