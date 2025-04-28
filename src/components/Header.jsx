import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo_blanc.png";
import { IoSearchOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import MenuHeaderDesktop from "./menu/menuPlus/MenuHeaderDesktop";
import fr from "../assets/france.png";
import MenuLangage from "./menu/menuLangage/MenuLangage";
import { LangageContext } from "../context/LangageContext";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";
import { RiMenu2Fill } from "react-icons/ri";
import MenuBurger from "./menu/menuResponsive/MenuBurger";
import { MenuContext } from "../context/MenuContext";

export default function Header() {
  const { langageMenu, setLangageMenu } = useContext(LangageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { menu, setMenu, burger, toggleBurger } = useContext(MenuContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("session")
  );

  useEffect(() => {
    const checkSession = () => {
      const session = localStorage.getItem("session");
      setIsLoggedIn(!!session);
    };

    window.addEventListener("storage", checkSession);

    return () => {
      window.removeEventListener("storage", checkSession);
    };
  }, []);

  return (
    <div className="flex items-center justify-between shadow-md px-8 py-4 gap-2.5 dark:bg-black dark:text-white dark:shadow-white">
      {theme === "dark" ? (
        <Link to="/">
          <img src={logoWhite} alt="logo blanc cineguide" className="w-52" />
        </Link>
      ) : (
        <Link to="/">
          <img src={logo} alt="logo cineguide" className="w-52" />
        </Link>
      )}
      <div className="flex items-center flex-col gap-4 max-1100:hidden">
        <div className="flex justify-between items-center max-1500:w-[400px] w-[640px] border border-black p-2 dark:border-white">
          <input
            type="text"
            placeholder="Rechercher un film, une série, un acteur ..."
            className="w-full outline-none placeholder:text-gray-500 dark:placeholder:text-white"
          />
          <IoSearchOutline className="dark:text-white" />
        </div>
        <div className="w-full flex">
          <NavLink
            to="/"
            className="mr-5 text-black  dark:text-white hover:text-fuchsia"
          >
            Accueil
          </NavLink>
          <NavLink
            to="/film"
            className="mr-5 text-black  dark:text-white hover:text-fuchsia"
          >
            Films
          </NavLink>
          <NavLink
            to="/series"
            className="mr-5 text-black  dark:text-white hover:text-fuchsia"
          >
            Séries
          </NavLink>
          <NavLink
            to="/actualites"
            className="mr-5 text-black  dark:text-white hover:text-fuchsia"
          >
            Actualités
          </NavLink>
          {menu ? (
            <div>
              <div
                onClick={() => setMenu(false)}
                className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
              >
                <p>Plus</p>
                <FaChevronUp />
              </div>
              <MenuHeaderDesktop />
            </div>
          ) : (
            <div
              onClick={() => setMenu(true)}
              className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
            >
              <p>Plus</p>
              <FaChevronDown />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-end max-1100:hidden">
        <div className="flex gap-5">
          {isLoggedIn ? (
            <NavLink
              to="/profil"
              className="bg-fuchsia px-18 py-4 text-white max-1500:px-8"
            >
              Mon compte
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/connexion"
                className="bg-fuchsia px-18 py-4 text-white max-1500:px-8"
              >
                Connexion
              </NavLink>
              <NavLink
                to="/inscription"
                className="bg-white text-black dark:bg-black dark:text-white px-18 py-4 border max-1500:px-8"
              >
                S'inscrire
              </NavLink>
            </>
          )}
          <div
            onClick={() => setLangageMenu(true)}
            className="flex items-center justify-between px-4 py-2.5 gap-2 w-fit border bg-white dark:bg-black dark:border-white"
          >
            <img src={fr} alt="drapeau langue française" className="w-8" />
            <FaChevronDown />
          </div>
          {langageMenu && <MenuLangage />}
        </div>
        <div className="flex gap-[30px] items-center justify-end w-full">
          <div
            onClick={toggleTheme}
            className="flex items-center gap-8 px-6 py-3 border cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <MdSunny className="text-3xl" />
                <p>Mode Light</p>
              </>
            ) : (
              <>
                <BsFillMoonStarsFill className="text-3xl" />
                <p>Mode Dark</p>
              </>
            )}
          </div>
          <div className="flex gap-5 items-center justify-center text-3xl">
            <FaFacebookSquare className="dark:text-white" />
            <FaSquareXTwitter className="dark:text-white" />
          </div>
        </div>
      </div>

      {burger ? (
        <MenuBurger />
      ) : (
        <RiMenu2Fill
          onClick={toggleBurger}
          className="hidden max-1100:block text-3xl cursor-pointer"
        />
      )}
    </div>
  );
}
