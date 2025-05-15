import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SerieContext } from "../../../context/SerieContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CardSerie() {
  const {
    filteredSeries = [],
    goSeeStates = {},
    alreadySeenStates = {},
    openInfoStates = {},
    toggleState,
    setGoSeeStates,
    setAlreadySeenStates,
    setOpenInfoStates,
    loading,
    error,
  } = useContext(SerieContext) || {};

  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-100px]">
        <h2>{t("common.loading", "Chargement des séries...")}</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-100px]">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!filteredSeries || filteredSeries.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen mt-[-100px]">
        <h2>
          {t(
            "series.noSerieAvailable",
            "Aucune série n'est disponible d'après vos recherches"
          )}
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* Affichage desktop */}
      <div className="hidden md:flex md:flex-wrap">
        {filteredSeries.map((serie, index) => (
          <div
            key={serie.id || index}
            className="flex md:w-full lg:w-[48%] gap-4 border p-4 mr-2 mb-4"
          >
            <NavLink to={`/detailserie/${serie._id || serie.id}`} className="w-48 h-64">
              <img
                className="w-full h-full object-cover"
                src={serie.image}
                alt={serie.titre}
              />
            </NavLink>
            <div className="w-[70%] flex flex-col justify-center mt-2 shadow-xl py-4 px-4">
              <p className="font-bold text-2xl">{serie.titre}</p>
              <div className="flex">
                <p className="mr-3">
                  {serie.dateDebut
                    ? new Date(serie.dateDebut).getFullYear()
                    : "N/A"}
                </p>
                <p className="mr-3">Note : {serie.note || "N/A"}</p>
                <p className="mr-3">{serie.duree || "N/A"}</p>
              </div>
              <p>
                {serie.synopsis
                  ? serie.synopsis.length > 50
                    ? serie.synopsis.slice(0, 50) + "..."
                    : serie.synopsis
                  : "Pas de synopsis disponible"}
              </p>
              <div className="flex flex-col ">
                <button
                  onClick={() =>
                    toggleState && toggleState(setGoSeeStates, serie.id)
                  }
                  className={`mt-2 cursor-pointer text-white w-[130px] h-[40px] lg:text-[15px] ${
                    goSeeStates[serie.id] ? "bg-gray-fonce" : "bg-gray-400"
                  }`}
                >
                  {goSeeStates[serie.id]
                    ? "+ " + t("home.aVoir", "À voir")
                    : t("home.dejaAjoute", "Déjà ajouté")}
                </button>
                <div className="flex">
                  <button className="mt-2 mr-2 cursor-pointer bg-fuchsia text-white w-[130px] h-[40px] lg:text-[15px]">
                    {t("home.regarder", "Regarder")}
                  </button>
                  <button
                    onClick={() =>
                      toggleState && toggleState(setAlreadySeenStates, serie.id)
                    }
                    className={`mt-2 cursor-pointer text-white w-[130px] h-[40px] lg:text-[15px] ${
                      alreadySeenStates[serie.id]
                        ? "bg-green-600"
                        : "bg-red-400"
                    }`}
                  >
                    {alreadySeenStates[serie.id]
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
          {filteredSeries.map((serie, index) => (
            <SwiperSlide
              key={serie.id || index}
              className="flex! flex-col items-center relative"
            >
              <div className="relative">
                <NavLink to={`/detailserie/${serie._id || serie.id}`} className="w-[375px]">
                  <img
                    className="w-[375px]"
                    src={serie.image}
                    alt={serie.titre}
                  />
                </NavLink>
                <button
                  onClick={() =>
                    toggleState && toggleState(setOpenInfoStates, serie.id)
                  }
                  className="cursor-pointer absolute bottom-0 right-0 mr-[10px] mb-2 text-white text-4xl bg-pink-700 px-2 rounded"
                >
                  {openInfoStates[serie.id] ? "-" : "+"}
                </button>
              </div>
              <div
                className={`w-[375px]! flex flex-col justify-center text-center mt-2 shadow-xl py-4 ${
                  openInfoStates[serie.id] ? "flex" : "hidden"
                }`}
              >
                <p className="font-bold text-2xl">{serie.titre}</p>
                <p>
                  {serie.dateDebut
                    ? new Date(serie.dateDebut).getFullYear()
                    : "N/A"}
                </p>
                <p>Note : {serie.note || "N/A"}</p>
                <p>{serie.duree || "N/A"}</p>
                <p>{serie.synopsis || "Pas de synopsis disponible"}</p>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() =>
                      toggleState && toggleState(setGoSeeStates, serie.id)
                    }
                    className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] ${
                      goSeeStates[serie.id] ? "bg-gray-fonce" : "bg-gray-400"
                    }`}
                  >
                    {goSeeStates[serie.id]
                      ? "+ " + t("home.aVoir", "À voir")
                      : t("home.dejaAjoute", "Déjà ajouté")}
                  </button>
                  <button className="mt-2 cursor-pointer bg-fuchsia text-white w-[250px] h-[50px]">
                    {t("home.regarder", "Regarder")}
                  </button>
                  <button
                    onClick={() =>
                      toggleState && toggleState(setAlreadySeenStates, serie.id)
                    }
                    className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] ${
                      alreadySeenStates[serie.id]
                        ? "bg-green-600"
                        : "bg-red-400"
                    }`}
                  >
                    {alreadySeenStates[serie.id]
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
  );
}
