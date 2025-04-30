import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import MenuHeaderMobile from "../menuPlus/MenuHeaderMobile";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import MenuLangage from "../menuLangage/MenuLangage";
import { ThemeContext } from "../../../context/ThemeContext";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { LangageContext } from "../../../context/LangageContext";
import { MenuContext } from "../../../context/MenuContext";
import { AuthContext } from "../../../context/AuthContext";

export default function MenuBurger() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { langageMenu, setLangageMenu, selectedLang, toggleLangageMenu } =
    useContext(LangageContext);
  const { setMenuPlus, menuPlus, toggleBurger, menuRef } =
    useContext(MenuContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div
      ref={menuRef}
      className="absolute top-0 right-0 flex flex-col gap-4 px-5 py-8 bg-white shadow-md text-center min-1100:hidden min-h-screen w-56 dark:bg-black border border-black dark:border-white z-50"
    >
      <div className="flex justify-end">
        <IoMdClose className="cursor-pointer text-3xl" onClick={toggleBurger} />
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
        {menuPlus ? (
          <div className="w-full flex flex-col gap-1">
            <div
              onClick={() => setMenuPlus(false)}
              className="flex justify-center items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
            >
              <p>Plus</p>
              <FaChevronUp />
            </div>
            <MenuHeaderMobile />
          </div>
        ) : (
          <div
            onClick={() => setMenuPlus(true)}
            className="flex justify-center items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
          >
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
          className="flex justify-center items-center gap-4 w-full py-3  cursor-pointer"
        >
          {theme === "dark" ? (
            <>
              <MdSunny className="text-3xl" />
            </>
          ) : (
            <>
              <BsFillMoonStarsFill className="text-3xl" />
            </>
          )}
        </div>
        <div className="flex gap-5 items-center justify-center text-3xl">
          <FaFacebookSquare className="dark:text-white" />
          <FaSquareXTwitter className="dark:text-white" />
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="relative inline-block">
            <div
              onClick={() => toggleLangageMenu()}
              className="flex items-center justify-between px-4 py-2.5 gap-2 w-fit border bg-white dark:bg-black dark:border-white cursor-pointer"
            >
              <img
                src={selectedLang.img}
                alt={selectedLang.desc}
                className="w-8"
              />
              <FaChevronDown
                className={`transition-transform ${
                  langageMenu ? "rotate-180" : ""
                }`}
              />
            </div>
            {langageMenu && <MenuLangage />}
          </div>
        </div>
      </div>
    </div>
  );
}
