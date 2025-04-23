import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function CardFilm({ FilmData }) {
  const [openInfo, setOpenInfo] = useState(false);
  const [goSee, setGoSee] = useState(false);
  const [alreadySeen, setAlreadySeen] = useState(false);
  function toggleState(stateSetter) {
    stateSetter((prevState) => !prevState);
  }
  return (
    <div className="flex items-center justify-center ">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={50}
        slidesPerView={1}
      >
        {FilmData.map((film) => (
          <SwiperSlide className="flex! flex-col items-center  relative ">
            <div className="relative">
              <img className="w-[375px]" src={film.image} alt="" />
              <button
                onClick={() => toggleState(setOpenInfo)}
                className="cursor-pointer absolute bottom-0 right-0 mr-[10px] mb-2 text-white text-4xl bg-pink-700 px-2 rounded"
              >
                {openInfo ? "+" : "-"}
              </button>
            </div>
            <div
              className={`w-[375px]! flex flex-col justify-center text-center mt-2 shadow-xl py-4 ${
                openInfo ? "hidden" : "flex"
              }`}
            >
              <p className="font-bold text-2xl">{film.titre}</p>
              <p>{film.dateSortie}</p>
              <p>{film.note}</p>
              <p>{film.duree}</p>
              <p>{film.synopsis}</p>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => toggleState(setGoSee)}
                  className={`mt-2 cursor-pointer  text-white w-[150px] h-[50px] ${
                    goSee ? "bg-gray-fonce" : "bg-gray-400"
                  }`}
                >
                  {goSee ? "+ A voir" : " Déjà ajouter"}
                </button>
                <button className="mt-2 cursor-pointer bg-fuchsia text-white w-[250px] h-[50px]">
                  Regarder
                </button>
                <button
                  onClick={() => toggleState(setAlreadySeen)}
                  className={`mt-2 cursor-pointer text-white w-[150px] h-[50px] ${
                    alreadySeen ? "bg-green-600" : "bg-red-400"
                  }`}
                >
                  {alreadySeen ? "Déjà vu" : " + Pas encore vu"}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
