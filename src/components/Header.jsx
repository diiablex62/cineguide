import React, { useContext } from "react";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo_blanc.png";
import { IoSearchOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import MenuHeaderDesktop from "./menu/menuPlus/MenuHeaderDesktop";
import MenuLangage from "./menu/menuLangage/MenuLangage";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";
import { RiMenu2Fill } from "react-icons/ri";
import MenuBurger from "./menu/menuResponsive/MenuBurger";
import { MenuContext } from "../context/MenuContext";
import { IoIosLogOut } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";
import LangButton from "./menu/LangButton";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { menu, setMenu, burger, toggleBurger } = useContext(MenuContext);
  const { logout, isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between shadow-md p-4  gap-2.5 dark:bg-black dark:text-white dark:shadow-white">
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
          <NavLink
            to="/jeux"
            className="mr-5 text-black  dark:text-white hover:text-fuchsia"
          >
            Jeux
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
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/profil"
                className="bg-fuchsia flex justify-center items-center h-[50px] px-2 text-white "
              >
                Mon compte
              </NavLink>
              <a
                onClick={logout}
                className="text-2xl cursor-pointer hover:text-fuchsia"
              >
                <IoIosLogOut />
              </a>
            </>
          ) : (
            <>
              <NavLink
                to="/connexion"
                className="bg-fuchsia flex justify-center items-center h-[50px] w-[150px] px-2 text-white "
              >
                Connexion
              </NavLink>
              <NavLink
                to="/inscription"
                className="bg-white text-black flex justify-center items-center dark:bg-black dark:text-white h-[50px] w-[150px] border max-1500:px-8"
              >
                S'inscrire
              </NavLink>
            </>
          )}
          <LangButton />
        </div>
        <div className="flex gap-[30px] items-center justify-end w-full">
          <div
            onClick={toggleTheme}
            className="flex items-center gap-8 justify-center cursor-pointer"
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
