import React, { useEffect, useState } from "react";
import { ActorContext } from "../../context/ActorContext";
import { useNavigate } from "react-router-dom";
import FilmParActeur from "../../data/FilmParActeur.json";
import Recompenses from "../../data/Recompense.json";
import { BASE_URL } from "../../utils/url";

export function ActorProvider({ children }) {
  const [allActors, setAllActors] = useState();
  const [detailActor, setDetailActor] = useState({
    name: "Chargement...",
    date_de_naissance: "Chargement..",
    age: 0,
    nationalite: "Chargement",
    oeuvres_principales: [],
    description: "",
    biographie: "",
    tmdbId: 0,
  });
  const navigate = useNavigate();
  const [actor, setActor] = useState({});

  useEffect(() => {
    async function getAllActors() {
      try {
        const response = await fetch(`${BASE_URL}/acteurs`);
        if (response.ok) {
          const actorsFromApi = await response.json();
          setAllActors(actorsFromApi);
        }
      } catch (error) {
        console.error("Vidéo introuvable", error);
      }
    }
    getAllActors();
  }, []);

  const toggleActor = (params) => {
    setActor(params);
  };

  const actorRedirect = (actor) => {
    navigate(`/acteurs/${actor._id}`);
  };

  const filmsByActor = FilmParActeur.filter(
    (film) => film.idActeur === actor.tmdbId
  );

  const recompenseByActor = Recompenses.filter(
    (recompense) => recompense.idActeur === actor.tmdbId
  ).map((recompense) => ({
    ...recompense,
    film: FilmParActeur.find((film) => film.id === recompense.idFilm),
  }));

  const getGenredJob = (job) => {
    if (!job) return ""; // Protection contre les valeurs undefined ou null

    let genredJob;
    if (actor.gender === 1) {
      // Femme
      genredJob = job
        .replace("réalisateur ou réalisatrice", "réalisatrice")
        .replace("producteur ou productrice", "productrice")
        .replace(
          "producteur délégué ou productrice déléguée",
          "productrice déléguée"
        )
        .replace("acteur ou actrice", "actrice")
        .replace("youtubeur ou youtubeuse", "youtubeuse")
        .replace("musicien ou musicienne", "musicienne")
        .replace("chanteur ou chanteuse", "chanteuse")
        .replace("Acting", "actrice")
        .replace("acting", "actrice")
        .replace("avocat ou avocate", "avocate")
        .replace("compositeur ou compositrice", "compositrice")
        .replace("chercheur ou chercheuse", "chercheuse")
        .replace("ingénieur ou ingénieure", "ingénieure")
        .replace("concepteur ou conceptrice", "conceptrice")
        .replace(
          "auteur-compositeur ou autrice-compositrice",
          "autrice-compositrice"
        );
    } else if (actor.gender === 2) {
      // Homme
      genredJob = job
        .replace("réalisateur ou réalisatrice", "réalisateur")
        .replace("producteur ou productrice", "producteur")
        .replace(
          "producteur délégué ou productrice déléguée",
          "producteur délégué"
        )
        .replace("acteur ou actrice", "acteur")
        .replace("youtubeur ou youtubeuse", "youtubeur")
        .replace("musicien ou musicienne", "musicien")
        .replace("chanteur ou chanteuse", "chanteur")
        .replace("Acting", "acteur")
        .replace("acting", "acteur")
        .replace("avocat ou avocate", "avocat")
        .replace("compositeur ou compositrice", "compositeur")
        .replace("chercheur ou chercheuse", "chercheur")
        .replace("ingénieur ou ingénieure", "ingénieur")
        .replace("concepteur ou conceptrice", "concepteur")
        .replace(
          "auteur-compositeur ou autrice-compositrice",
          "auteur-compositeur"
        );
    } else {
      genredJob = job;
    }
    // Ajoute une majuscule au début du métier
    return genredJob.charAt(0).toUpperCase() + genredJob.slice(1);
  };

  return (
    <ActorContext.Provider
      value={{
        detailActor,
        setDetailActor,
        allActors,
        actorRedirect,
        toggleActor,
        actor,
        filmsByActor,
        recompenseByActor,
        getGenredJob,
      }}
    >
      {children}
    </ActorContext.Provider>
  );
}
