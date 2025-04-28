import React from "react";
import Filtre from "../../components/filtre/Filtre";
import CardSerie from "./components/CardSerie";

export default function SeriesList() {
  return (
     <div className="dark:bg-black dark:text-white min-h-screen">
          <div className="md:flex md:p-4">
            <div className="md:w-[40%] md:mr-5 lg:w-[25%] ">
              <Filtre></Filtre>
            </div>
            <div className="md:w-[60%] lg:w-[75%]">
              <CardSerie></CardSerie>
            </div>
          </div>
          {/* <div className="flex justify-center mt-5">
            <button className="cursor-pointer">Voir plus</button>
          </div> */}
        </div>
  );
}
