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
    <div className='w-full flex  text-black flex-col justify-center items-center pt-2 lg:justify-around h-full '>
      <div className='flex justify-center items-center min-w-full'>
        <img className='max-h-[100px]' src={logo} alt='' />
      </div>
      <div className='flex justify-around items-center w-full lg:flex-col lg:items-start lg:mt-0 lg:pl-4'>
        <NavLink
          to='/jeux'
          className='flex flex-col items-center lg:flex-row lg:mb-6'
          end>
          <img src={house} alt='' /> <span className='lg:hidden'>Accueil</span>
          <span className='hidden lg:block ml-4'>Accueil</span>
        </NavLink>
        <NavLink
          className='flex flex-col items-center lg:flex-row lg:mb-6'
          to='/jeux/quizz'
          end>
          <img src={quizz} alt='' /> <span className='lg:hidden'>Quizz</span>
          <span className='hidden lg:block ml-4'>Quiz Personnalisé</span>
        </NavLink>
        <NavLink
          className='flex flex-col items-center lg:flex-row lg:mb-6'
          to='/jeux/devine'>
          <img src={devine} alt='' /> <span className='lg:hidden'>Devine</span>
          <span className='hidden lg:block  ml-4'>Devine le Film / Serie</span>
        </NavLink>
        <NavLink
          className='flex flex-col items-center lg:flex-row lg:mb-6'
          to='/jeux/affiche'>
          <img src={affiche} alt='' />
          <span className='lg:hidden'>Affiche</span>
          <span className='hidden lg:block ml-4'>Affiches Brouillées</span>
        </NavLink>
      </div>
      <div className='w-full mt-10'>
        <NavLink
          className='flex items-center justify-around border-b pb-4 lg:border-0 lg:p-5'
          to='/'>
          <img src={arrow} alt='' />
          <span>Revenir sur Cineguide</span>
          <img src={house} alt='' />
        </NavLink>
      </div>
    </div>
  );
}
