import React, { useContext, useEffect, useState } from "react";
import { ActorContext } from "../../context/ActorContext";
import { useNavigate } from "react-router-dom";
import FilmParActeur from "../../data/FilmParActeur.json";
import Recompenses from "../../data/Recompense.json";
import { BASE_URL } from "../../utils/url";
import { FilmContext } from "../../context/FilmContext";
import { getAll } from "../../apis/film.api";

export function ActorProvider({ children }) {
  const { film } = useContext(FilmContext);
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
  const [actorMovies, setActorMovies] = useState([]);

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

  useEffect(() => {
    if (actor.tmdbId) {
      filmsByActor();
    }
  }, [actor.tmdbId]);

  const toggleActor = (params) => {
    setActor(params);
  };

  const actorRedirect = (actor) => {
    navigate(`/acteurs/${actor._id}`);
  };

  // const getAllMovies = async () => {
  //   const movies = await getAll();
  //   setAllMovies(movies);
  //   console.log(movies);
  // };

  const filmsByActor = () => {
    // Filtre les films où l'acteur est présent dans le tableau des acteurs
    setActorMovies(
      film.filter((f) =>
        f.acteurs.some((a) => a.id.toString() === actor.tmdbId)
      )
    );
  };

  // const recompenseByActor = () => {
  //   // Filtre les films où l'acteur est présent dans le tableau des acteurs
  //   setActorMovies(
  //     film.filter((f) =>
  //       f.acteurs.some((a) => a.id.toString() === actor.tmdbId)
  //     )
  //   );
  // };

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
        .replace("entraîneur ou entraîneuse", "entraîneuse")
        .replace("footballeur ou footballeuse", "footballeuse")
        .replace("pratiquant ou pratiquante", "pratiquante")
        .replace("joueur ou joueuse", "joueuse")
        .replace("participante ou participant", "participante")
        .replace("ambassadeur ou ambassadrice", "ambassadrice")
        .replace("militant ou militante", "militante")
        .replace("théologien ou théologienne", "théologienne")
        .replace("danseur ou danseuse", "danseuse")
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
        .replace("entraîneur ou entraîneuse", "entraîneur")
        .replace("footballeur ou footballeuse", "footballeur")
        .replace("pratiquant ou pratiquante", "pratiquant")
        .replace("joueur ou joueuse", "joueur")
        .replace("participante ou participant", "participant")
        .replace("ambassadeur ou ambassadrice", "ambassadeur")
        .replace("militant ou militante", "militant")
        .replace("théologien ou théologienne", "théologien")
        .replace("danseur ou danseuse", "danseur")
        .replace(
          "auteur-compositeur ou autrice-compositrice",
          "auteur-compositeur"
        );
    } else if (actor.gender === 0) {
      genredJob = job.replace("Acting", "acteur ou actrice");
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
        actorMovies,
        recompenseByActor,
        getGenredJob,
        setActorMovies,
      }}
    >
      {children}
    </ActorContext.Provider>
  );
}
