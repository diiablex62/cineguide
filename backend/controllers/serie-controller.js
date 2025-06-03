const Serie = require("../models/serie.schema");
const {
  getPopularSeries,
  getSerieDetails,
  getSeriesCredits,
  getSerieVideos,
} = require("../services/tmdb");
const { createSaisonForSerie } = require("./saison-controller");

// Récupérer toutes les séries
const getAllSeries = async (req, res) => {
  try {
    const series = await Serie.find().select("-saisons");
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Récupérer une série par ID
const getSerieById = async (req, res) => {
  try {
    // Recherche par ID ou par l'attribut id
    const serie = await Serie.findOne({
      $or: [{ _id: req.params.id }, { id: req.params.id }],
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

// // Créer une nouvelle série
// const createSerie = async (req, res) => {
//   try {
//     const serie = new Serie(req.body);
//     const newSerie = await serie.save();
//     res.status(201).json(newSerie);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { getAllSeries, getSerieById, createSerie };

async function createSerieWithDetails(details) {
  try {
    if (!details) {
      console.warn("⚠️ createSerieWithDetails ignorée : détails null");
      return;
    }
    const existing = await Serie.findOne({ tmdbId: details.id });
    if (existing) {
      console.log(`⏩ Série déjà existante : ${details.name}`);
      return;
    }
    const credits = (await getSeriesCredits(details.id)) || { cast: [] };
    const acteurs = credits.cast.filter(
      (cast) => cast.known_for_department === "Acting"
    );
    const videos =
      details.videos?.results || (await getSerieVideos(details.id));
    const trailer = videos ? videos : [];
    const serie = new Serie({
      titre: details.name,
      synopsis: details.overview ? details.overview : "N/A",
      image: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : null,
      acteurs: acteurs
        ? acteurs.map((actor) => ({
            name: actor.name,
            id: actor.id,
          }))
        : [],
      note: details.vote_average,
      dateDebut: details.first_air_date,
      dateFin: details.last_air_date || null,
      createur: details.created_by?.[0]?.name || "Inconnu",
      bandeAnnonce: trailer.key
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : "N/A",
      genre: details.genres.map((g) => g.name),
      paysProduction: details.origin_country || [],
      platforms: details.networks?.map((n) => n.name) || [],
      langues: details.spoken_languages?.map((l) => l.name) || [],
      dureeEpisodeMoyenne: details.episode_run_time?.[0]
        ? `${details.episode_run_time[0]} min`
        : "Inconnue",
      tmdbId: details.id,
    });

    await serie.save();

    if (!serie || !serie._id) {
      console.error("❌ Erreur sauvegarde série: sérieDoc invalide");
      return;
    }
    console.log(`Série "${serie.titre}" sauvegardée en base.`);
    return serie;
  } catch (err) {
    console.error("Erreur sauvegarde série:", err.message);
    throw err;
  }
}

async function importMultipleSeries() {
  const pageMax = 3; // Limite pour tests
  let seriesCount = 0;

  for (let page = 1; page <= pageMax; page += 1) {
    console.log(`Chargement page ${page} de séries...`);
    let discoverData;
    try {
      discoverData = await getPopularSeries(page);
      // console.log("Réponse TMDB page", page, ":", discoverData);
    } catch (err) {
      console.error(
        `Erreur lors de la récupération des séries page ${page}:`,
        err.message
      );
      continue;
    }

    if (!discoverData || !Array.isArray(discoverData.results)) {
      console.log(`Pas de données à la page ${page}`);
      continue;
    }

    for (const serieSummary of discoverData.results) {
      try {
        // console.log(
        //   `🟡 Import série ID: ${serieSummary.id} — Nom: ${serieSummary.name}`
        // );
        const details = await getSerieDetails(serieSummary.id);
        if (!details) {
          console.warn(
            `⚠️ Série ${serieSummary.id} ignorée (détails introuvables).`
          );
          continue;
        }

        const nouvelleSerie = await createSerieWithDetails(details); // ← tu peux faire un return de la série ici

        if (nouvelleSerie) {
          await createSaisonForSerie(nouvelleSerie);
        }
        seriesCount++;
        console.log(`Série importée : ${details.name}`);
      } catch (err) {
        console.error(
          `Erreur chargement détails série ${serieSummary.id}:`,
          err.message
        );
      }
    }
  }

  console.log(`${seriesCount} séries valides importées.`);
}

/**
 * Récupérer une série via son ID Mongo
 */
// const getSerieById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const serie = await Serie.findById(id).populate({
//       path: "saisons",
//       populate: {
//         path: "episodes",
//       },
//     });
//     if (!serie) return res.status(404).json({ error: "Série non trouvée" });
//     res.json(serie);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

/**
 * Récupérer toutes les séries (exemple simple)
 */
// const getAllSeries = async (req, res) => {
//   try {
//     const series = await Serie.find();
//     res.json(series);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  getAllSeries,
  getSerieById,
  importMultipleSeries,
  createSerieWithDetails,
};
