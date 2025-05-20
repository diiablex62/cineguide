// Importation correcte des modèles avec gestion des erreurs
let Film, Serie, Saison, Acteur, Episode;

try {
  Film = require("../models/films.schema");
  Serie = require("../models/serie.schema");
  Saison = require("../models/saison.schema");
  Acteur = require("../models/acteur.schema");
  Episode = require("../models/episode.schema");
  console.log("Modèles chargés avec succès pour la recherche");
} catch (error) {
  console.error("Erreur lors du chargement des modèles:", error);
}

// Données de test pour la recherche
const mockData = {
  films: [
    {
      _id: "film1",
      titre: "Leonardo DiCaprio - Film 1",
      synopsis: "Synopsis du film 1",
    },
    {
      _id: "film2",
      titre: "Leo - Un film d'animation",
      synopsis: "Synopsis du film 2",
    },
    { _id: "film3", titre: "Le Léopard", synopsis: "Synopsis du film 3" },
  ],
  series: [
    {
      _id: "serie1",
      titre: "Leonardo - La série",
      synopsis: "Synopsis de la série 1",
    },
    { _id: "serie2", titre: "Léo et Max", synopsis: "Synopsis de la série 2" },
  ],
  saisons: [
    {
      _id: "saison1",
      titre: "Saison 1",
      serie: { _id: "serie1", titre: "Leonardo - La série" },
    },
    {
      _id: "saison2",
      titre: "Léo et ses amis",
      serie: { _id: "serie2", titre: "Léo et Max" },
    },
  ],
  episodes: [
    {
      _id: "episode1",
      titre: "Épisode avec Leonardo",
      saison: { _id: "saison1", serie: { _id: "serie1" } },
    },
    {
      _id: "episode2",
      titre: "Léo - Le grand départ",
      saison: { _id: "saison2", serie: { _id: "serie2" } },
    },
  ],
  acteurs: [
    {
      _id: "acteur1_id",
      id: 1,
      nom: "Leonardo DiCaprio",
      image: "https://example.com/leo.jpg",
    },
    {
      _id: "acteur2_id",
      id: 2,
      nom: "Léonard Nimoy",
      image: "https://example.com/nimoy.jpg",
    },
  ],
};

// Fonction pour rechercher dans films, séries, saisons, épisodes et acteurs
const searchAll = async (req, res) => {
  try {
    console.log("Recherche en cours avec le terme:", req.query.query);
    const searchQuery = req.query.query || "";

    if (!searchQuery || searchQuery.length < 2) {
      return res.status(200).json({
        films: [],
        series: [],
        saisons: [],
        episodes: [],
        acteurs: [],
      });
    }

    let results = {
      films: [],
      series: [],
      saisons: [],
      episodes: [],
      acteurs: [],
    };

    try {
      if (Film && Serie && Saison && Acteur && Episode) {
        // Si les modèles sont disponibles, faire une recherche dans la base de données
        const films = await Film.find({
          titre: { $regex: searchQuery, $options: "i" },
        }).limit(5);
        const series = await Serie.find({
          titre: { $regex: searchQuery, $options: "i" },
        }).limit(5);
        const saisons = await Saison.find({
          titre: { $regex: searchQuery, $options: "i" },
        })
          .populate("serie", "titre")
          .limit(5);
        const episodes = await Episode.find({
          titre: { $regex: searchQuery, $options: "i" },
        })
          .populate("saison", "titre")
          .limit(5);
        const acteurs = await Acteur.find({
          nom: { $regex: searchQuery, $options: "i" },
        })
          .select("_id id nom image")
          .limit(5);

        results = {
          films,
          series,
          saisons,
          episodes,
          acteurs,
        };

        console.log("Résultats de recherche dans la BD:", {
          films: films.length,
          series: series.length,
          saisons: saisons.length,
          episodes: episodes.length,
          acteurs: acteurs.length,
        });
      }
    } catch (dbError) {
      console.error("Erreur lors de la recherche dans la BD:", dbError);
      // Continuer avec les données de test
    }

    // Si aucun résultat trouvé dans la BD, utiliser les données de test
    if (
      results.films.length === 0 &&
      results.series.length === 0 &&
      results.saisons.length === 0 &&
      results.episodes.length === 0 &&
      results.acteurs.length === 0
    ) {
      const lcSearchQuery = searchQuery.toLowerCase();

      results.films = mockData.films.filter((film) =>
        film.titre.toLowerCase().includes(lcSearchQuery)
      );
      results.series = mockData.series.filter((serie) =>
        serie.titre.toLowerCase().includes(lcSearchQuery)
      );
      results.saisons = mockData.saisons.filter(
        (saison) =>
          saison.titre.toLowerCase().includes(lcSearchQuery) ||
          saison.serie.titre.toLowerCase().includes(lcSearchQuery)
      );
      results.episodes = mockData.episodes.filter((episode) =>
        episode.titre.toLowerCase().includes(lcSearchQuery)
      );
      results.acteurs = mockData.acteurs.filter((acteur) =>
        acteur.nom.toLowerCase().includes(lcSearchQuery)
      );

      console.log("Résultats de recherche avec données de test:", {
        films: results.films.length,
        series: results.series.length,
        saisons: results.saisons.length,
        episodes: results.episodes.length,
        acteurs: results.acteurs.length,
      });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la recherche", error: error.message });
  }
};

module.exports = {
  searchAll,
};
