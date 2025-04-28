import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SerieContext } from "../../../context/SerieContext";
import { NavLink } from "react-router-dom";

export default function CardSerie() {
  const {
    serie,
    goSeeStates,
    alreadySeenStates,
    openInfoStates,
    toggleState,
    setGoSeeStates,
    setAlreadySeenStates,
    setOpenInfoStates,
  } = useContext(SerieContext);

  return (
    <>
      {serie.length === 0 ? (
        <div className="flex justify-center items-center h-screen mt-[-100px]">
          <h2>Aucun serie n'est disponible d'après vos recherches</h2>
        </div>
      ) : (
        <>
          {/* Affichage desktop */}
          <div className="hidden md:flex md:flex-wrap">
            {serie.map((serie, index) => (
              <div
                key={index}
                className="flex md:w-full lg:w-[48%] gap-4 border p-4 mr-2 mb-4"
              >
                <NavLink to={`/detailserie/${serie.id}`} className="w-48 h-64">
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
                      {new Date(serie.dateDebut).getFullYear()}
                    </p>
                    <p className="mr-3">Note : {serie.note}</p>
                    <p className="mr-3">{serie.duree}</p>
                  </div>
                  <p>
                    {serie.synopsis.length > 50
                      ? serie.synopsis.slice(0, 50) + "..."
                      : serie.synopsis}
                  </p>
                  <div className="flex flex-col ">
                    <button
                      onClick={() => toggleState(setGoSeeStates, index)}
                      className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] lg:text-[15px] ${
                        goSeeStates[index] ? "bg-gray-fonce" : "bg-gray-400"
                      }`}
                    >
                      {goSeeStates[index] ? "+ A voir" : "Déjà ajouté"}
                    </button>
                    <div className="flex">
                      <button className="mt-2 mr-2 cursor-pointer bg-fuchsia text-white w-[250px] h-[50px] lg:text-[15px]">
                        Regarder
                      </button>
                      <button
                        onClick={() => toggleState(setAlreadySeenStates, index)}
                        className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] lg:text-[15px] ${
                          alreadySeenStates[index]
                            ? "bg-green-600"
                            : "bg-red-400"
                        }`}
                      >
                        {alreadySeenStates[index]
                          ? "Déjà vu"
                          : "+ Pas encore vu"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Affichage mobile (Swiper) */}
          <div className="flex items-center justify-center md:hidden">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={50}
              slidesPerView={1}
            >
              {serie.map((serie, index) => (
                <SwiperSlide
                  key={index}
                  className="flex! flex-col items-center relative"
                >
                  <div className="relative">
                    <NavLink
                      to={`/detailserie/${serie.id}`}
                      className="w-[375px]"
                    >
                      <img className="w-[375px]" src={serie.image} alt="" />
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
                    <p className="font-bold text-2xl">{serie.titre}</p>
                    <p>{new Date(serie.dateSortie).getFullYear()}</p>
                    <p>Note : {serie.note}</p>
                    <p>{serie.duree}</p>
                    <p>{serie.synopsis}</p>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => toggleState(setGoSeeStates, index)}
                        className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] ${
                          goSeeStates[index] ? "bg-gray-fonce" : "bg-gray-400"
                        }`}
                      >
                        {goSeeStates[index] ? "+ A voir" : "Déjà ajouté"}
                      </button>
                      <button className="mt-2 cursor-pointer bg-fuchsia text-white w-[250px] h-[50px]">
                        Regarder
                      </button>
                      <button
                        onClick={() => toggleState(setAlreadySeenStates, index)}
                        className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] ${
                          alreadySeenStates[index]
                            ? "bg-green-600"
                            : "bg-red-400"
                        }`}
                      >
                        {alreadySeenStates[index]
                          ? "Déjà vu"
                          : "+ Pas encore vu"}
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
