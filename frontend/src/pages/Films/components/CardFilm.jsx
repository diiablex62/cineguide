import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FilmContext } from "../../../context/FilmContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Ajout

export default function CardFilm() {
  const {
    film,
    goSeeStates,
    alreadySeenStates,
    openInfoStates,
    toggleState,
    setGoSeeStates,
    setAlreadySeenStates,
    setOpenInfoStates,
    filteredFilm,
  } = useContext(FilmContext);

  const { t } = useTranslation(); // Ajout

  return (
    <>
      {filteredFilm.length === 0 ? (
        <div className="flex justify-center items-center h-screen mt-[-100px]">
          <h2>
            {t(
              "home.noFilmAvailable",
              "Aucun film n'est disponible d'après vos recherches"
            )}
          </h2>
        </div>
      ) : (
        <>
          {/* Affichage desktop */}
          <div className="hidden md:flex md:flex-wrap ">
            {filteredFilm.map((film, index) => (
              <div
                key={index}
                className="flex md:w-full lg:w-[48%] gap-4 border p-4 mr-2 mb-4"
              >
                <NavLink to={`/detailfilm/${film._id}`} className="w-48 h-64">
                  <img
                    className="w-full h-full object-cover"
                    src={film.image}
                    alt={film.titre}
                  />
                </NavLink>
                <div className="w-[70%] flex flex-col justify-center mt-2 shadow-xl py-4 px-4">
                  <p className="font-bold text-2xl">{film.titre}</p>
                  <div className="flex">
                    <p className="mr-3">
                      {new Date(film.dateSortie).getFullYear()}
                    </p>
                    <p className="mr-3">
                      {t("home.note", "Note")} : {film.note}
                    </p>
                    <p className="mr-3">{film.duree}</p>
                  </div>
                  <p>
                    {film.synopsis.length > 50
                      ? film.synopsis.slice(0, 50) + "..."
                      : film.synopsis}
                  </p>
                  <div className="flex flex-col ">
                    <button
                      onClick={() => toggleState(setGoSeeStates, index)}
                      className={`mt-2 cursor-pointer text-white w-[130px] h-[40px] lg:text-[15px] ${
                        goSeeStates[index] ? "bg-gray-fonce" : "bg-gray-400"
                      }`}
                    >
                      {goSeeStates[index]
                        ? "+ " + t("home.aVoir", "À voir")
                        : t("home.dejaAjoute", "Déjà ajouté")}
                    </button>
                    <div className="flex">
                      <NavLink
                        to={`/detailfilm/${film._id}`}
                        className="mt-2 cursor-pointer flex items-center justify-center mr-2 bg-fuchsia text-white w-[130px] h-[40px] lg:text-[15px]"
                      >
                        {t("home.regarder", "Regarder")}
                      </NavLink>
                      <button
                        onClick={() =>
                          toggleState(setAlreadySeenStates, film._id)
                        }
                        className={`mt-2 cursor-pointer text-white w-[130px] h-[40px] lg:text-[15px] ${
                          alreadySeenStates[film._id]
                            ? "bg-green-600"
                            : "bg-red-400"
                        }`}
                      >
                        {alreadySeenStates[film._id]
                          ? t("home.dejaVu", "Déjà vu")
                          : "+ " + t("home.pasEncoreVu", "Pas encore vu")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Affichage mobile (Swiper) */}
          <div className="flex items-center justify-center md:hidden p-5">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={50}
              slidesPerView={1}
            >
              {film.map((film, index) => (
                <SwiperSlide
                  key={index}
                  className="flex! flex-col items-center relative"
                >
                  <div className="relative">
                    <NavLink
                      to={`/detailfilm/${film._id}`}
                      className="w-[375px]"
                    >
                      <img className="w-[375px]" src={film.image} alt="" />
                    </NavLink>
                    <button
                      onClick={() => toggleState(setOpenInfoStates, index)}
                      className="cursor-pointer absolute bottom-0 right-0 mr-[10px] mb-2 text-white text-4xl bg-pink-700 px-2 rounded"
                    >
                      {openInfoStates[index] ? "+" : "-"}
                    </button>
                  </div>
                  <div
                    className={`w-[375px]! flex flex-col justify-center text-center mt-2 shadow-xl py-4 ${
                      openInfoStates[index] ? "hidden" : "flex"
                    }`}
                  >
                    <p className="font-bold text-2xl">{film.titre}</p>
                    <p>{new Date(film.dateSortie).getFullYear()}</p>
                    <p>
                      {t("home.note", "Note")} : {film.note}
                    </p>
                    <p>{film.duree}</p>
                    <p>{film.synopsis}</p>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => toggleState(setGoSeeStates, index)}
                        className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] flex justify-center items-center ${
                          goSeeStates[index] ? "bg-gray-fonce" : "bg-gray-400"
                        }`}
                      >
                        {goSeeStates[index]
                          ? "+ " + t("home.aVoir", "À voir")
                          : t("home.dejaAjoute", "Déjà ajouté")}
                      </button>
                      <NavLink
                        to={`/detailfilm/${film._id}`}
                        className="mt-2 cursor-pointer bg-fuchsia text-white w-[150px]  flex justify-center items-center h-[50px]"
                      >
                        {t("home.regarder", "Regarder")}
                      </NavLink>
                      <button
                        onClick={() => toggleState(setAlreadySeenStates, index)}
                        className={`mt-2 cursor-pointer text-white w-[150px] h-[50px]  flex justify-center items-center ${
                          alreadySeenStates[index]
                            ? "bg-green-600"
                            : "bg-red-400"
                        }`}
                      >
                        {alreadySeenStates[index]
                          ? t("home.dejaVu", "Déjà vu")
                          : "+ " + t("home.pasEncoreVu", "Pas encore vu")}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
}
