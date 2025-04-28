import React, { useContext } from "react";
import { FilmContext } from "../../../context/FilmContext";
import CardReview from "./CardReview";

export default function Review() {
  const { film } = useContext(FilmContext);
  return (
    <div>
      {film.map((film) => (
        <CardReview key={film.id} film={film} />
      ))}
    </div>
  );
}
