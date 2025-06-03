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

  const allActeurs = new Set();

  for (const f of films) {
    (f.acteurs || []).map((actor) => allActeurs.add(actor));
  }

  for (const s of series) {
    (s.acteurs || []).map((actor) => allActeurs.add(actor));
  }

  return Array.from(allActeurs);
}

async function importerDetailsActeur(idTMDB) {
  try {
    return await fetchFromTMDB(`person/${idTMDB}`);
  } catch (err) {
    console.error(`❌ Erreur détails TMDB acteur ${idTMDB}:`, err.message);
    return null;
  }
}

async function importerKnownForActeur(name) {
  try {
    const response = await fetchFromTMDB(
      `search/person?query=${encodeURIComponent(name)}`
    );

    if (!response || !response.results || response.results.length === 0) {
      console.warn(`⚠️ Aucun résultat known_for trouvé pour: ${name}`);
      return { known_for: [] };
    }

    // Prendre le premier résultat qui correspond le mieux
    const actor = response.results[0];

    if (!actor.known_for || !Array.isArray(actor.known_for)) {
      console.warn(`⚠️ Pas de known_for disponible pour: ${name}`);
      return { known_for: [] };
    }

    return {
      known_for: actor.known_for.map((work) => ({
        title: work.title || work.name || "Titre inconnu",
        media_type: work.media_type,
        year: work.release_date
          ? new Date(work.release_date).getFullYear()
          : null,
      })),
    };
  } catch (err) {
    console.error(`❌ Erreur détails TMDB acteur ${name}:`, err.message);
    return { known_for: [] };
  }
}

function calculerAge(dateNaissance) {
  try {
    return differenceInYears(new Date(), parseISO(dateNaissance));
  } catch {
    return null;
  }
}

// async function ajouterHF() {
//   try {
//     const allActeurs = await getActeursExistant();
//     for (const oneActor of allActeurs) {
//       const acteursFind = await Acteur.findOne({
//         $or: [{ name: oneActor.name }, { tmdbId: oneActor.id.toString() }],
//       });
//       const acteur = await fetchFromTMDB(`person/${acteursFind.tmdbId}`);
//       if (acteursFind.gender === 0) {
//         await Acteur.findByIdAndUpdate(
//           acteursFind._id,
//           { gender: acteur.gender || 0 },
//           { new: true }
//         );
//         console.log(`✅ Genre ajouté pour : ${acteursFind.name}`);
//       } else continue;
//     }
//   } catch (err) {
//     console.error(`❌ Erreur`, err.message);
//     return null;
//   }
// }

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getWikidataIdFromName(name) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
    name
  )}&language=fr&format=json&type=item&origin=*`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.search && data.search.length > 0) {
    return data.search[0].id;
  }

  return null;
}

const enrichirActeursDepuisWikidata = async (acteur) => {
  try {
    const nom = acteur.name;
    const wikidataId = await getWikidataIdFromName(nom);

    if (!wikidataId) {
      console.warn(`⚠️ Aucun ID Wikidata trouvé pour : ${nom}`);
      return;
    }

    const query = `
SELECT 
  (GROUP_CONCAT(DISTINCT ?occupationLabel; separator=", ") as ?occupations)
  ?debutActivite 
  (COUNT(DISTINCT ?film) AS ?nb_films) 
  (COUNT(DISTINCT ?prix) AS ?nb_prix) 
  (COUNT(DISTINCT ?nomination) AS ?nb_nominations) 
WHERE {
  wd:${wikidataId} wdt:P31 wd:Q5.
  OPTIONAL { wd:${wikidataId} wdt:P106 ?occupation. }
  OPTIONAL { ?film wdt:P161 wd:${wikidataId}. }
  OPTIONAL { ?prix wdt:P166 wd:${wikidataId}. }
  OPTIONAL { ?nomination wdt:P1346 wd:${wikidataId}. }
  OPTIONAL { wd:${wikidataId} wdt:P2031 ?debutActivite. }

  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "fr,en".
    ?occupation rdfs:label ?occupationLabel.
  }
}
GROUP BY ?debutActivite
`;

    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      query
    )}`;

    const res = await fetch(url, {
      headers: {
        Accept: "application/sparql-results+json",
        "User-Agent": "ActeursDataImporter/1.0 (newsonic62@gmail.com)",
      },
    });

    if (!res.ok) {
      console.warn(`⚠️ ${nom} non trouvé sur Wikidata : ${res.statusText}`);
      return;
    }

    const data = await res.json();
    const bindings = data?.results?.bindings?.[0];

    if (!bindings) {
      console.warn(`⚠️ ${nom} : aucune donnée Wikidata`);
      return;
    }

    const nb_films = bindings.nb_films?.value
      ? parseInt(bindings.nb_films.value)
      : 0;
    const prix = bindings.nb_prix?.value ? parseInt(bindings.nb_prix.value) : 0;
    const nominations = bindings.nb_nominations?.value
      ? parseInt(bindings.nb_nominations.value)
      : 0;
    const debutCarriere = bindings.debutActivite?.value || null;
    const anneeDebutCarriere = debutCarriere
      ? new Date(debutCarriere).getFullYear()
      : null;
    const occupations = bindings.occupations?.value || [];

    // console.log(
    //   `✅ ${nom} récupéré : ${nb_films} films, ${prix} prix, ${nominations} nominations.`
    // );
    // console.log("✅ Enrichissement Wikidata terminé !");
    return { nb_films, prix, nominations, anneeDebutCarriere, occupations };
  } catch (err) {
    console.error("❌ Erreur lors de l'enrichissement Wikidata :", err.message);
  }
};

async function ajouterIdMongoDansActeurs(acteur) {
  try {
    if (!acteur || !acteur.tmdbId || !acteur._id) {
      console.error("❌ Données d'acteur invalides pour la mise à jour", {
        acteur: acteur?.name,
        tmdbId: acteur?.tmdbId,
        mongoId: acteur?._id,
      });
      return;
    }

    const tmdbId = parseInt(acteur.tmdbId);
    const mongoId = acteur._id.toString();

    // Mise à jour des films
    const filmsResult = await Film.updateMany(
      { "acteurs.id": tmdbId },
      {
        $set: {
          "acteurs.$[elem]._id": mongoId,
          "acteurs.$[elem].name": acteur.name,
        },
      },
      {
        arrayFilters: [{ "elem.id": tmdbId }],
        multi: true,
      }
    );

    // Mise à jour des séries
    const seriesResult = await Serie.updateMany(
      { "acteurs.id": tmdbId },
      {
        $set: {
          "acteurs.$[elem]._id": mongoId,
          "acteurs.$[elem].name": acteur.name,
        },
      },
      {
        arrayFilters: [{ "elem.id": tmdbId }],
        multi: true,
      }
    );

    // Vérification après mise à jour
    const filmsApres = await Film.find({
      acteurs: {
        $elemMatch: {
          id: tmdbId,
          _id: mongoId,
        },
      },
    });

    const seriesApres = await Serie.find({
      acteurs: {
        $elemMatch: {
          id: tmdbId,
          _id: mongoId,
        },
      },
    });

    // console.log(`
    // ✅ Résultat de la mise à jour pour ${acteur.name}:
    // Films:
    //   - Modifiés: ${filmsResult.modifiedCount}
    //   - Vérifiés après: ${filmsApres.length}
    // Séries:
    //   - Modifiées: ${seriesResult.modifiedCount}
    //   - Vérifiées après: ${seriesApres.length}
    // `);
  } catch (error) {
    console.error(
      `❌ Erreur lors de l'ajout de l'ID MongoDB pour ${acteur.name}:`,
      error.message
    );
  }
}

async function importActeursDepuisTMDB() {
  try {
    const allActeurs = await getActeursExistant();
    console.log(`🔍 Début import de ${allActeurs.length} acteurs...`);

    let importCount = 0;
    let errorCount = 0;

    for (const oneActor of allActeurs) {
      try {
        const deja = await Acteur.findOne({
          $or: [{ name: oneActor.name }, { tmdbId: oneActor.id.toString() }],
        });
        if (deja) {
          console.log(`⏩ Acteur déjà en base : ${oneActor.name}`);
          continue;
        }

        await sleep(1000);
        const details = await importerDetailsActeur(oneActor.id);
        const connu = await importerKnownForActeur(oneActor.name);
        if (!details) {
          console.warn(
            `⚠️ Impossible d'obtenir les détails pour : ${oneActor.name}`
          );
          errorCount++;
          continue;
        }
        const data = await enrichirActeursDepuisWikidata(details);

        const acteur = new Acteur({
          metiers:
            data === undefined
              ? details.known_for_department || []
              : typeof data.occupations === "string"
              ? data.occupations.split(", ").filter(Boolean)
              : Array.isArray(data.occupations)
              ? data.occupations
              : [data.occupations].filter(Boolean),
          name: details.name,
          image: details.profile_path
            ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
            : "N/A",
          nom_de_naissance: details.also_known_as?.[0] || details.name,
          date_de_naissance: details.birthday || "Inconnue",
          age: calculerAge(details.birthday) || 0,
          lieu_de_naissance: details.place_of_birth || "Inconnue",
          carriere: data === undefined ? 0 : data.anneeDebutCarriere,
          nb_films: data === undefined ? 0 : data.nb_films,
          prix: data === undefined ? 0 : data.prix,
          nominations: data === undefined ? 0 : data.nominations,
          oeuvres_principales:
            connu.known_for?.map((o) => o.title || o.name) || [],
          description: `${details.name} est principalement connu pour ${details.known_for_department}`,
          biographie: details.biography || "Biographie indisponible",
          gender: details.gender || details.genre,
          tmdbId: details.id.toString(),
        });

        await acteur.save();
        await ajouterIdMongoDansActeurs(acteur);

        importCount++;
        console.log(`✅ Acteur importé : ${acteur.name}`);
      } catch (error) {
        errorCount++;
        console.error(
          `❌ Erreur lors de l'import de ${oneActor.name}:`,
          error.message
        );
      }
    }

    console.log(`
      📊 Rapport d'import :
      - Total traité : ${allActeurs.length}
      - Importés avec succès : ${importCount}
      - Erreurs : ${errorCount}
    `);
    return { success: true, imported: importCount, errors: errorCount };
  } catch (error) {
    console.error("❌ Erreur générale d'import:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  getActeurs,
  // getOneActeur,
  // updateActeur,
  // deleteActeur,
  // createActeur,
  importActeursDepuisTMDB,
  // ajouterHF,
};
