import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import MenuHeaderMobile from "../menuPlus/MenuHeaderMobile";

export default function MenuBurger({ toggleBurger }) {
  const [menuPlus, setMenuPlus] = useState(false);
  const menuPlusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuPlusRef.current && !menuPlusRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    if (menuPlus) {
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuPlus]);

  return (
    <div className="absolute top-0 right-0 flex flex-col gap-8 px-5 py-8 bg-white shadow-md text-center min-1100:hidden">
      <div className="flex justify-end">
        <IoMdClose className="cursor-pointer text-3xl" onClick={toggleBurger} />
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-col justify-center gap-1">
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/film">Films</NavLink>
          <NavLink to="/series">Séries</NavLink>
          <NavLink to="/actualites">Actualités</NavLink>
          {menuPlus ? (
            <div>
              <div
                onClick={() => setMenuPlus(false)}
                className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
              >
                <p>Plus</p>
                <FaChevronUp />
              </div>
              <MenuHeaderMobile
                menuPlusRef={menuPlusRef}
                setMenuPlus={setMenuPlus}
              />
            </div>
          ) : (
            <div
              onClick={() => setMenuPlus(true)}
              className="flex items-center gap-1 hover:text-fuchsia cursor-pointer text-black dark:text-white"
            >
              <p>Plus</p>
              <FaChevronDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
