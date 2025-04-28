import React, { useContext } from "react";
import CardList from "./CardList";
import { FilmContext } from "../../../context/FilmContext";

export default function List() {
  const { film } = useContext(FilmContext);
  return (
    <div className="flex flex-wrap gap-4 pb-4">
      {film.map((film) => (
        <CardList key={film.id} film={film} />
      ))}
    </div>
  );
}
