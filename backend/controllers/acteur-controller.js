const Acteur = require("../models/acteur.schema");
const Serie = require("../models/serie.schema");
const Film = require("../models/films.schema");
const fetchFromTMDB = require("../services/tmdb.js").fetchFromTMDB;
const { differenceInYears, parseISO } = require("date-fns");

const getActeurs = async (req, res) => {
  try {
    const acteurs = await Acteur.find();
    res.status(200).json(acteurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getOneActeur = async (req, res) => {
//   try {
//     const acteur = await Acteur.findById(req.params.id);
//     if (!acteur) {
//       res.status(500).json({ error: "Acteur introuvable" });
//     } else {
//       res.status(200).json(video);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const updateActeur = async (req, res) => {
//   try {
//     const acteur = await Acteur.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!acteur) {
//       res.status(500).json({ error: "Acteur introuvable" });
//     } else {
//       res.status(200).json(acteur);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const deleteActeur = async (req, res) => {
//   try {
//     const acteur = await Acteur.findByIdAndDelete(req.params.id);
//     if (!acteur) {
//       res.status(500).json({ error: "Acteur introuvable" });
//     } else {
//       res.status(200).json({ message: "Acteur supprimé" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const createActeur = async (req, res) => {
//   try {
//     const acteur = new Acteur(req.body);
//     await acteur.save();
//     res.status(200).json(acteur);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// récupérer les acteurs des films et séries dans tmdb et les stocker dans MongoDB
async function getActeursExistant() {
  const films = await Film.find({}, "acteurs");
  const series = await Serie.find({}, "acteurs");

  const noms = new Set();

  for (const f of films) {
    (f.acteurs || []).forEach((nom) => noms.add(nom));
  }

  for (const s of series) {
    (s.acteurs || []).forEach((nom) => noms.add(nom));
  }

  return Array.from(noms);
}

async function chercherActeurParNom(nom) {
  try {
    const res = await fetchFromTMDB(
      `search/person?query=${encodeURIComponent(nom)}`
    );
    const acteur = res.results?.[0];
    return acteur || null;
  } catch (err) {
    console.error(`❌ Erreur recherche TMDB pour "${nom}":`, err.message);
    return null;
  }
}

async function importerDetailsActeur(idTMDB) {
  try {
    return await fetchFromTMDB(`person/${idTMDB}`);
  } catch (err) {
    console.error(`❌ Erreur détails TMDB acteur ${idTMDB}:`, err.message);
    return null;
  }
}

function calculerAge(dateNaissance) {
  try {
    return differenceInYears(new Date(), parseISO(dateNaissance));
  } catch {
    return null;
  }
}

async function importActeursDepuisTMDB() {
  const noms = await getActeursExistant();

  for (const nom of noms) {
    const deja = await Acteur.findOne({ nom });
    if (deja) {
      console.log(`⏩ Acteur déjà en base : ${nom}`);
      continue;
    }

    const resultRecherche = await chercherActeurParNom(nom);
    if (!resultRecherche) continue;

    const details = await importerDetailsActeur(resultRecherche.id);
    if (!details) continue;

    const acteur = new Acteur({
      metiers: details.known_for_department
        ? [details.known_for_department]
        : [],
      nom: details.name,
      image: details.profile_path
        ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
        : null,
      nom_de_naissance: details.also_known_as?.[0] || details.name,
      date_de_naissance: details.birthday || "Inconnue",
      age: calculerAge(details.birthday) || 0,
      nationalite: details.place_of_birth || "Inconnue",
      carriere: details.birthday
        ? new Date().getFullYear() - new Date(details.birthday).getFullYear()
        : null,
      nb_films: details.movie_credits?.cast?.length || null,
      prix: 0, // Placeholder
      nominations: 0, // Placeholder
      oeuvres_principales:
        resultRecherche.known_for?.map((o) => o.title || o.name) || [],
      description: `${details.name} est principalement connu pour ${details.known_for_department}`,
      biographie: details.biography || "Biographie indisponible",
      tmdbId: details.id,
    });

    await acteur.save();
    console.log(`✅ Acteur importé : ${acteur.nom}`);
  }
}

module.exports = {
  getActeurs,
  getOneActeur,
  updateActeur,
  deleteActeur,
  createActeur,
  importActeursDepuisTMDB,
};
