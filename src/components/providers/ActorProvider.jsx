import React, { useState } from "react";
import { ActorContext } from "../../context/ActorContext";
import ActorData from "../../data/Acteurs.json";

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
  return (
    <ActorContext.Provider value={{ detailActor, setDetailActor, allActors }}>
      {children}
    </ActorContext.Provider>
  );
}
