import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import film from "../../../assets/jeux/film.svg";
import serie from "../../../assets/jeux/serie.svg";
import actor from "../../../assets/jeux/actor.svg";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Affiche() {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [genreList, setGenreList] = useState([]);

  function addGenreList(e) {
    e.preventDefault();
    const genre = e.target.genre.value;
    if (genre === "") {
      toast.error("Le genre ne peut pas être vide.");
      return;
    }
    if (genreList.includes(genre)) {
      toast.error("Ce genre est déjà ajouté.");
      return;
    }
    if (genreList.length >= 10) {
      toast.error("Vous ne pouvez pas ajouter plus de 10 genres.");
      return;
    }
    setGenreList((prevGenreList) => [...prevGenreList, genre]);
    toast.success("Genre ajouté avec succès !");
    e.target.genre.value = "";
  }
  return (
    <div className="flex flex-col lg:flex-row mb-5 ">
      <Toaster></Toaster>
      <div className="w-full lg:w-2/8">
        <Navbar></Navbar>
      </div>
      <div className="w-full lg:w-6/8 lg:flex lg:flex-col lg:justify-around lg:items-center lg:h-screen  px-3">
        <div className="flex flex-col justify-center lg:flex-start mt-5 w-full">
          <h2 className="font-medium text-center lg:text-start text-xl">
            Bienvenue dans Affiche brouillées
          </h2>
          <p className="text-center italic opacity-80 lg:text-start ">
            Objectif : trouver le film ou la serie le plus rapidement possible
          </p>
        </div>

        <div className="flex justify-center w-full lg:justify-start">
          <p className="text-center font-medium text-xl mt-5 lg:text-start ">
            Etape 1
          </p>
        </div>
        <div className="flex flex-col justify-center items-center lg:justify-start w-full">
          <p className="font-medium underline mt-5 lg:w-full">
            Choisi ton thème :
          </p>
          <div className="lg:flex lg:items-center lg:justify-center lg:w-full lg:gap-30 lg:mt-10 lg:mb-10">
            <div className="flex flex-col items-center mb-5 mt-5 lg:mt-0 lg-flex-row lg:mb-0 ">
              <label
                className={`cursor-pointer flex flex-col items-center justify-center py-2 px-6 lg:mb-0 ${
                  selectedTheme === "serie" ? "border-1" : ""
                }`}
                onClick={() => setSelectedTheme("serie")}
              >
                <input
                  type="radio"
                  name="theme"
                  value="serie"
                  className="mr-2 hidden"
                />
                Serie
                <img src={serie} className="lg:w-[100px] lg:mt-5" alt="" />
              </label>
            </div>
            <div className="flex flex-col items-center mb-5 lg:mb-0">
              <label
                className={`cursor-pointer flex flex-col items-center justify-center py-2 px-6 lg:mb-0 ${
                  selectedTheme === "film" ? "border-1 " : ""
                }`}
                onClick={() => setSelectedTheme("film")}
              >
                <input
                  type="radio"
                  name="theme"
                  value="film"
                  className="mr-2 hidden"
                />
                Film
                <img src={film} className="lg:w-[100px] lg:mt-5" alt="" />
              </label>
            </div>
            <div className="flex flex-col items-center mb-5 lg:mb-0">
              <label
                className={`cursor-pointer flex flex-col items-center justify-center py-2 px-6 lg:mb-0 ${
                  selectedTheme === "actor" ? "border-1 " : ""
                }`}
                onClick={() => setSelectedTheme("actor")}
              >
                <input
                  type="radio"
                  name="theme"
                  value="actor"
                  className="mr-2 hidden"
                />
                Acteur
                <img src={actor} className="lg:w-[100px] lg:mt-5" alt="" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center lg:w-full ">
          <p className="font-medium underline mt-5 text-center lg:w-full lg:text-start">
            Choisi le genre (optionnel) :
          </p>

          <form
            onSubmit={addGenreList}
            className="flex flex-col items-center"
            action=""
          >
            <label
              htmlFor="genre"
              className="font-medium underline mt-5 text-center px-1 lg:mt-10"
            >
              Tape un ou plusieurs genre(s) que tu souhaites :
            </label>
            <input
              className="border p-1 w-[80%] lg:w-[60%] mt-3"
              id="genre"
              name="genre"
              type="text"
              pattern="[A-Za-z\s]*"
              title="Seules les lettres et les espaces sont autorisés."
            />
            <button className="border  w-[150px] h-[30px] mt-3 flex justify-center items-center cursor-pointer">
              Add
            </button>
          </form>
          <p className="italic text-center mt-3">
            {genreList.length > 0
              ? `Genres sélectionnés : ${genreList.join(", ")}`
              : "Aucun genre sélectionné"}
          </p>
          <button className="mt-5 w-[150px] h-[40px] flex justify-center items-center cursor-pointer lg:mt-20 bg-fuchsia text-white">
            Jouer
          </button>
        </div>
      </div>
    </div>
  );
}
