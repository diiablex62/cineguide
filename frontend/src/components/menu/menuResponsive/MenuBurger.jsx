import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import MenuHeaderMobile from "../menuPlus/MenuHeaderMobile";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ThemeContext } from "../../../context/ThemeContext";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { MenuContext } from "../../../context/MenuContext";
import { AuthContext } from "../../../context/AuthContext";
import LangButton from "../LangButton";
import { IoIosLogOut } from "react-icons/io";

export default function MenuBurger() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { burger, setMenuPlus, menuPlus, toggleBurger, menuRef } =
    useContext(MenuContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity ${
          burger ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleBurger} // Ferme le menu si on clique sur l'overlay
      ></div>

      {/* Menu */}
      <div
        ref={menuRef}
        className='absolute top-0 right-0 flex flex-col gap-4 px-5 py-8 bg-white shadow-md text-center min-1100:hidden min-h-screen w-56 dark:bg-black border border-black dark:border-white z-50'>
        <div className='flex justify-end'>
          <IoMdClose
            className='cursor-pointer text-3xl'
            onClick={toggleBurger}
          />
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          {/* <div className="flex flex-col justify-center gap-1"> */}
          <NavLink to="/" className="text-black  dark:text-white">
            Accueil
          </NavLink>
          <NavLink to="/film" className="text-black  dark:text-white">
            Films
          </NavLink>
          <NavLink to="/series" className="text-black  dark:text-white">
            Séries
          </NavLink>
          <NavLink to="/actualites" className="text-black  dark:text-white">
            Actualités
          </NavLink>
          <NavLink to="/jeux" className="text-black  dark:text-white">
            Jeux
          </NavLink>
          {menuPlus ? (
            <div className='w-full flex flex-col gap-1'>
              <div
                onClick={() => setMenuPlus(false)}
                className='flex justify-center items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white'>
                <p>Plus</p>
                <FaChevronUp />
              </div>
              <MenuHeaderMobile />
            </div>
          ) : (
            <div
              onClick={() => setMenuPlus(true)}
              className='flex justify-center items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white'>
              <p>Plus</p>
              <FaChevronDown />
            </div>
          )}
          {isLoggedIn ? (
            <NavLink to="/profil" className="bg-fuchsia py-4 text-white w-full">
              Mon Compte
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/connexion"
                className="bg-fuchsia py-4 text-white w-full"
              >
                Connexion
              </NavLink>
              <NavLink
                to="/inscription"
                className="bg-white text-black dark:bg-black dark:text-white py-4 border w-full"
              >
                S'inscrire
              </NavLink>
            </>
          )}
          <div
            onClick={toggleTheme}
            className='flex justify-center items-center gap-4 w-full py-3  cursor-pointer'>
            {theme === "dark" ? (
              <>
                <MdSunny className='text-3xl' />
              </>
            ) : (
              <>
                <BsFillMoonStarsFill className='text-3xl' />
              </>
            )}
          </div>
          <div className='flex gap-5 items-center justify-center text-3xl'>
            <FaFacebookSquare className='dark:text-white' />
            <FaSquareXTwitter className='dark:text-white' />
          </div>
          <LangButton />
        </div>
      </div>
    </>
  );
}
