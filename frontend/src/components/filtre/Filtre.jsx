import React, { useContext } from "react";
import PlatformeData from "../../data/Platforme";
import Langue from "../../data/Langue";
import GenreData from "../../data/Genre";
import { ImCross } from "react-icons/im";
import { FiltreContext } from "../../context/FiltreContext";
import { FilmContext } from "../../context/FilmContext";

export default function Filtre() {
  const { openFilter, toggleFilter } = useContext(FiltreContext);
  const {
    filterPlatform,
    filterGender,
    searchMovie,
    allMovie,
    filterLanguage,
    filterAlreadySeen,
    filterNotSeen,
  } = useContext(FilmContext);

  // Pour obtenir la valeur d'origine à partir de la traduction (pour le filtre)
  const getPlatformOriginal = (translated) => {
    const found = PlatformeData.find(
      (p) => p.name === translated // Simplifié car plus de traduction
    );
    return found ? found.name : translated;
  };
  const getGenreOriginal = (translated) => {
    const found = GenreData.find(
      (g) => g.type === translated // Simplifié
    );
    return found ? found.type : translated;
  };
  const getLangueOriginal = (translated) => {
    const found = Langue.find(
      (l) => l.name === translated // Simplifié
    );
    return found ? found.name : translated;
  };

  return (
    <>
      <div className="flex mb-5 p-2 md:hidden">
        <button
          onClick={toggleFilter}
          className={`bg-white cursor-pointer text-black border flex rounded items-center justify-center text-center p-2 ${
            openFilter ? "hidden" : "flex"
          }`}
        >
          <img src="../src/assets/filter.svg" className="w-[20px]" alt="" />
          Filtrer
        </button>
      </div>
      <div
        className={`w-full bg-white dark:border-white dark:bg-black absolute z-10 p-2 md:p-0 md:flex md:relative ${
          openFilter ? "flex" : "hidden"
        }`}
      >
        <div className="border p-8">
          <div className="flex justify-end md:hidden">
            <button onClick={toggleFilter} className="cursor-pointer">
              <ImCross />
            </button>
          </div>
          <h2 className="font-bold text-3xl dark:text-white">Trier</h2>
          <p className="dark:text-white">Par plateforme :</p>
          <div className="flex flex-wrap gap-3 items-center mt-4">
            {PlatformeData.map((platforme, index) => {
              return (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    filterPlatform(platforme.name);
                    document
                      .querySelectorAll(".platform-link")
                      .forEach((el) => {
                        el.classList.remove("bg-black!", "text-white!");
                      });
                    e.target.classList.add("bg-black!", "text-white!");
                    document
                      .querySelectorAll('input[name="see"]')
                      .forEach((el) => {
                        el.checked = false;
                      });
                  }}
                  href="#"
                  key={index}
                  className="platform-link text-[12px] bg-white hover:bg-black hover:text-white text-black border flex rounded items-center justify-center text-center w-[50px] h-[50px]"
                >
                  {platforme.name}
                </a>
              );
            })}
          </div>
          <p className="mt-5 mb-2 dark:text-white">Afficher :</p>
          <div className="flex items-center gap-1 mb-2">
            <input
              id="all"
              type="radio"
              name="see"
              className="peer appearance-none w-5 h-5 border-2 dark:border-white border-black rounded-full bg-white checked:bg-black transition-colors duration-300"
              onClick={() => {
                document.querySelectorAll(".platform-link").forEach((el) => {
                  el.classList.remove("bg-black!", "text-white!");
                });
                document.querySelectorAll(".genre-link").forEach((el) => {
                  el.classList.remove("bg-black!", "text-white!");
                });

                allMovie();
              }}
            />
            <label htmlFor="all" className="dark:text-white">
              Tous
            </label>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <input
              id="see"
              name="see"
              type="radio"
              onClick={() => {
                document.querySelectorAll(".platform-link").forEach((el) => {
                  el.classList.remove("bg-black!", "text-white!");
                });
                document.querySelectorAll(".genre-link").forEach((el) => {
                  el.classList.remove("bg-black!", "text-white!");
                });

                filterAlreadySeen();
              }}
              className="peer appearance-none w-5 h-5 border-2 dark:border-white border-black rounded-full bg-white checked:bg-black transition-colors duration-300"
            />
            <label htmlFor="see" className="dark:text-white">
              Film que j’ai déjà vu
            </label>
          </div>

          <div className="flex items-center gap-1 mb-2">
            <input
              id="notsee"
              name="see"
              type="radio"
              onClick={() => {
                document.querySelectorAll(".platform-link").forEach((el) => {
                  el.classList.remove("bg-black!", "text-white!");
                });
                document.querySelectorAll(".genre-link").forEach((el) => {
                  el.classList.remove("bg-black!", "text-white!");
                });

                filterNotSeen();
              }}
              className="peer appearance-none w-5 h-5 border-2 dark:border-white border-black rounded-full bg-white checked:bg-black transition-colors duration-300"
            />
            <label htmlFor="notsee" className="dark:text-white">
              Film que je n'ai pas vu
            </label>
          </div>

          <p className="mt-5 mb-2 dark:text-white">Genres :</p>
          <div className="flex flex-wrap gap-3 items-center mt-4">
            {GenreData.map((genre, index) => {
              return (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    filterGender(genre.type);
                    document.querySelectorAll(".genre-link").forEach((el) => {
                      el.classList.remove("bg-black!", "text-white!");
                    });
                    e.target.classList.add("bg-black!", "text-white!");
                    document
                      .querySelectorAll('input[name="see"]')
                      .forEach((el) => {
                        el.checked = false;
                      });
                  }}
                  key={index}
                  className="genre-link text-[12px] bg-white hover:bg-black hover:text-white text-black border flex rounded items-center justify-center text-center p-2"
                >
                  {genre.type} {/* Remplacé translated par genre.type */}
                </a>
              );
            })}
          </div>
          <p className="mt-5 mb-2 dark:text-white">Langues :</p>
          <select
            className="bg-white w-full text-black border border-black rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => {
              // Trouver la langue d'origine à partir de la valeur traduite
              const selected = e.target.value;
              const original = getLangueOriginal(selected);
              filterLanguage(original);
            }}
          >
            {Langue.map((langue) => (
              <option key={langue.id} value={langue.name}>
                {langue.name}
              </option>
            ))}
          </select>
          <p className="mt-5 mb-2 dark:text-white">Mots-clés :</p>
          <input
            type="text"
            onChange={(e) => searchMovie(e.target.value)}
            placeholder="Filtrer par mot clés"
            className="w-full px-4 py-1 border border-black rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>
    </>
  );
}
