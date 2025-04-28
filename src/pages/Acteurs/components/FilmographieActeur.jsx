import React, { useContext } from "react";
import { ActorContext } from "../../../context/ActorContext";
export default function FilmographieActeur() {
  const { actor } = useContext(ActorContext);
  return (
    <div className="w-full">
      <div>
        <div className="flex justify-center md:justify-start">
          <h2 className="font-bold text-2xl">Acteur</h2>
        </div>
        <div className=" ">
          <div className="flex bg-gray-300 rounded-tl rounded-tr">
            <p className="w-1/3 hidden md:block">Année</p>
            <p className="w-1/3">Titre</p>
            <p className="w-1/3 hidden md:block">Rôle</p>
          </div>
          <div className="flex ">
            <p className="w-1/3 hidden md:block">2028</p>
            <p className="w-1/3">Oceanc’s 14</p>
            <p className="w-1/3 hidden md:block">Tkt</p>
          </div>
          <div className="flex ">
            <p className="w-1/3 hidden md:block">2028</p>
            <p className="w-1/3">Oceanc’s 14</p>
            <p className="w-1/3 hidden md:block">Tkt</p>
          </div>
          <div className="flex ">
            <p className="w-1/3 hidden md:block">2028</p>
            <p className="w-1/3">Oceanc’s 14</p>
            <p className="w-1/3 hidden md:block">Tkt</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center md:justify-start mt-4">
          <h2 className="font-bold text-2xl">Production</h2>
        </div>
        <div className=" ">
          <div className="flex bg-gray-300 rounded-tl rounded-tr">
            <p className="w-1/3 hidden md:block">Année</p>
            <p className="w-1/3">Titre</p>
            <p className="w-1/3 hidden md:block">Rôle</p>
          </div>
          <div className="flex ">
            <p className="w-1/3 hidden md:block">2028</p>
            <p className="w-1/3">Oceanc’s 14</p>
            <p className="w-1/3 hidden md:block">Tkt</p>
          </div>
          <div className="flex ">
            <p className="w-1/3 hidden md:block">2028</p>
            <p className="w-1/3">Oceanc’s 14</p>
            <p className="w-1/3 hidden md:block">Tkt</p>
          </div>
          <div className="flex ">
            <p className="w-1/3 hidden md:block">2028</p>
            <p className="w-1/3">Oceanc’s 14</p>
            <p className="w-1/3 hidden md:block">Tkt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
