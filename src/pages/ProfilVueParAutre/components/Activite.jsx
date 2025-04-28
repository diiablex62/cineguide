import React, { useContext } from "react";
import { FilmContext } from "../../../context/FilmContext";
import CardActivite from "./CardActivite";

export default function Activite() {
  const { film } = useContext(FilmContext);
  return (
    <div>
      {film.map((film) => (
        <CardActivite key={film.id} film={film} />
      ))}
    </div>
  );
}
