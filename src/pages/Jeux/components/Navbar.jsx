import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/jeux/logo-black.svg";
import affiche from "../../../assets/jeux/affiche.svg";
import devine from "../../../assets/jeux/devine.svg";
import quizz from "../../../assets/jeux/quiz.svg";
import house from "../../../assets/jeux/house.svg";
import arrow from "../../../assets/jeux/arrow.svg";
export default function Navbar() {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-2">
      <div className="flex justify-center items-center min-w-full">
        <img className="max-h-[100px]" src={logo} alt="" />
      </div>
      <div className="flex justify-around items-center w-full mt-10">
        <NavLink to="/jeux" className="flex flex-col items-center" end>
          <img src={house} alt="" /> <span className="lg:hidden">Accueil</span>
          <span className="hidden lg:block">Accueil</span>
        </NavLink>
        <NavLink className="flex flex-col items-center" to="/jeux/quizz" end>
          <img src={quizz} alt="" /> <span className="lg:hidden">Quizz</span>
          <span className="hidden lg:block">Quiz Personnalisé</span>
        </NavLink>
        <NavLink className="flex flex-col items-center" to="/jeux/devine">
          <img src={devine} alt="" /> <span className="lg:hidden">Devine</span>
          <span className="hidden lg:block">Devine le Film / Serie</span>
        </NavLink>
        <NavLink className="flex flex-col items-center" to="/jeux/affiche">
          <img src={affiche} alt="" />{" "}
          <span className="lg:hidden">Affiche</span>
          <span className="hidden lg:block">Affiches Brouillées</span>
        </NavLink>
      </div>
      <div className="w-full mt-10">
        <NavLink
          className="flex items-center justify-around border-b pb-4"
          to="/"
        >
          <img src={arrow} alt="" />
          <span className="lg:hidden">Revenir sur Cineguide</span>
          <img src={house} alt="" />
        </NavLink>
      </div>
    </div>
  );
}
