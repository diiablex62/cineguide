import React from "react";
import Filtre from "../../components/filtre/Filtre";
import CardFilm from "./components/CardFilm";
import FilmData from "../../data/Film.json";
export default function FilmsList() {
  return (
    <div className="">
      <Filtre></Filtre>
      <CardFilm FilmData={FilmData}></CardFilm>
    </div>
  );
}
