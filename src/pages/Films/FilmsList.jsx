import React from "react";
import Filtre from "../../components/filtre/Filtre";
import CardFilm from "./components/CardFilm";
import FilmData from "../../data/Film.json";
export default function FilmsList() {
  return (
    <>
      <div className="md:flex md:mt-5 md:m-4">
        <div className="md:w-[40%] md:mr-5 lg:w-[25%] ">
          <Filtre></Filtre>
        </div>
        <div className="md:w-[60%] lg:w-[75%]">
          <CardFilm FilmData={FilmData}></CardFilm>
        </div>
      </div>
      <div className="flex justify-center m-5">
        <button className="cursor-pointer">Voir plus</button>
      </div>
    </>
  );
}
