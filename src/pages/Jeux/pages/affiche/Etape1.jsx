import React, { useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import film from "../../../../assets/jeux/film.svg";
import serie from "../../../../assets/jeux/serie.svg";
import actor from "../../../../assets/jeux/actor.svg";
import { AfficheContext } from "../../../../context/AfficheContext";
export default function Etape1() {
  const {
    selectedTheme,
    genreList,
    setSelectedTheme,
    removeGenre,
    initGames,
    addGenreList,
    setGenreList,
  } = useContext(AfficheContext);

  useEffect(() => {
    setSelectedTheme(null);
    setGenreList("");
    genreRef.current.value = "";
  }, []);

  const genreRef = useRef(null);

  return (
    <div className="w-full lg:w-6/8 lg:flex lg:flex-col  lg:items-center px-10 bg-white mt-5 shadow rounded lg:rounded-r-xl h-auto">
      <div className="flex flex-col justify-center lg:flex-start mt-5 w-full">
        <h2 className="font-medium text-center lg:text-start text-xl">
          Bienvenue dans Affiche brouillées
        </h2>
        <p className="text-center italic opacity-80 lg:text-start ">
          Objectif : trouver le film ou la serie le plus rapidement possible
        </p>
      </div>

      <div className="flex justify-center w-full lg:justify-start">
        <p className="text-center mt-10 font-medium text-xl  lg:text-start ">
          Etape 1
        </p>
      </div>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={(e) => {
          initGames(e);
        }}
      >
        <div className="flex flex-col justify-center items-center lg:justify-start w-full">
          <p className="font-medium underline  lg:w-full">Choisi ton thème :</p>

          <div className="lg:flex lg:items-center lg:justify-center lg:w-full lg:gap-30 lg:mt-4 lg:mb-4">
            <div className="flex flex-col items-center mb-5 mt-5 lg:mt-0 lg-flex-row lg:mb-0 ">
              <label
                className={`cursor-pointer flex flex-col items-center justify-center py-4 px-10 lg:mb-0 ${
                  selectedTheme === "serie"
                    ? "border-1 rounded-2xl font-medium"
                    : ""
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
                className={`cursor-pointer flex flex-col items-center justify-center  py-4 px-10 lg:mb-0 ${
                  selectedTheme === "film"
                    ? "border-1 rounded-2xl font-medium"
                    : ""
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
            {/* <div className="flex flex-col items-center mb-5 lg:mb-0">
              <label
                className={`cursor-pointer flex flex-col items-center justify-center  py-4 px-10 lg:mb-0 ${
                  selectedTheme === "actor"
                    ? "border-1 rounded-2xl font-medium"
                    : ""
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
            </div> */}
          </div>
        </div>
        <p className="font-medium underline mt-5 text-center lg:w-full lg:text-start">
          Options :
        </p>

        <div className="flex flex-col  w-full">
          <label
            htmlFor="difficulty"
            className="font-medium underline mt-5 text-center lg:text-start  lg:mt-10 "
          >
            Niveau de difficulté :
          </label>
          <select
            id="difficulty"
            name="difficulty"
            className="border p-1 w-[100%] md:w-[80%] lg:w-[60%] mt-3 cursor-pointer"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-10 lg:w-full ">
          <div className="flex flex-col w-full">
            <label
              htmlFor="genre"
              className="font-medium underline mt-5  px-1 lg:mt-10 text-center lg:text-start"
            >
              Tape un ou plusieurs genre(s) que tu souhaites :
            </label>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <input
                ref={genreRef}
                className="border p-1 w-[80%] lg:w-[60%] h-[35px]  mt-3"
                id="genre"
                name="genre"
                type="text"
                pattern="[A-Za-z\s]*"
                title="Seules les lettres et les espaces sont autorisés."
              />
              <a
                onClick={(e) => {
                  addGenreList(e, genreRef);
                }}
                className="border w-[150px] h-[35px] mt-3 flex justify-center items-center cursor-pointer hover:bg-black hover:text-white"
              >
                Ajouter
              </a>
            </div>
            <p className="italic  mt-3 text-center lg:text-start">
              {genreList.length > 0
                ? `Genres sélectionnés : ${genreList.join(", ")}`
                : "Aucun genre sélectionné"}
            </p>
            <a onClick={removeGenre} className="cursor-pointer underline pt-4">
              {genreList.length > 0 ? `Renitialiser ?` : ""}
            </a>
          </div>
        </div>
        <button className="mt-5 mb-5 w-[150px] h-[40px] flex justify-center items-center cursor-pointer lg:mt-10 bg-fuchsia text-white">
          Jouer
        </button>
      </form>
    </div>
  );
}
