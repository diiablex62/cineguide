import React, { useState } from "react";
import { ActorContext } from "../../context/ActorContext";
import ActorData from "../../data/Acteurs.json";
import { useNavigate } from "react-router-dom";

export default function ActorProvider({ children }) {
  const [allActors, setAllActors] = useState(ActorData);
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

  const toggleActor = (params) => {
    setActor(params);
  };

  const actorRedirect = () => {
    navigate(`/acteurs/${detailActor.id}`);
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
      }}
    >
      {children}
    </ActorContext.Provider>
  );
}
