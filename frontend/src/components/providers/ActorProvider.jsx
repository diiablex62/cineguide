import React, { useEffect, useState } from "react";
import { ActorContext } from "../../context/ActorContext";
import { useNavigate } from "react-router-dom";
import FilmParActeur from "../../data/FilmParActeur.json";
import Recompenses from "../../data/Recompense.json";
import { url } from "../../url";

export function ActorProvider({ children }) {
  const [allActors, setAllActors] = useState();
  const [detailActor, setDetailActor] = useState({
    id: 0,
    nom: "Chargement...",
    date_de_naissance: "Chargement..",
    age: 0,
    nationalite: "Chargement",
    oeuvres_principales: [],
    description: "",
    biographie: "",
  });
  const navigate = useNavigate();
  const [actor, setActor] = useState("");

  useEffect(() => {
    async function getAllActors() {
      try {
        const response = await fetch(`${url}/acteurs`);
        if (response.ok) {
          const actorsFromApi = await response.json();
          console.log("Acteurs chargés:", actorsFromApi);
          setAllActors(actorsFromApi);
        }
      } catch (error) {
        console.error("Vidéo introuvable", error);
      }
    }
    getAllActors();
  }, []);

  const toggleActor = (params) => {
    console.log("Actor toggled:", params);
    setActor(params);
  };

  const actorRedirect = () => {
    console.log("Redirection vers acteur:", detailActor.id);
    navigate(`/acteurs/${detailActor.id}`);
  };

  const filmsByActor = FilmParActeur.filter(
    (film) => film.idActeur === actor.id
  );

  const recompenseByActor = Recompenses.filter(
    (recompense) => recompense.idActeur === actor.id
  ).map((recompense) => ({
    ...recompense,
    film: FilmParActeur.find((film) => film.id === recompense.idFilm),
  }));

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
      }}>
      {children}
    </ActorContext.Provider>
  );
}
