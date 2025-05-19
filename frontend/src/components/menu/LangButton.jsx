import React, { useContext, useRef, useEffect, useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import MenuLangage from "./menuLangage/MenuLangage";
import { FaChevronDown } from "react-icons/fa";

export default function LangButton() {
  const contextValue = useContext(LangageContext);

  // Ajout d\'une vérification pour s\'assurer que contextValue n\'est pas null
  const {
    langageMenu,
    setLangageMenu,
    selectedLang = { img: "", desc: "" },
  } = contextValue || {
    langageMenu: false,
    setLangageMenu: () => {},
    selectedLang: { img: "", desc: "" },
  }; // Fournir des valeurs par défaut si le contexte est null

  const btnRef = useRef();

  useEffect(() => {
    console.log("Langage menu state:", langageMenu);
    if (!langageMenu) return;
    const handleClick = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setLangageMenu(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [langageMenu, setLangageMenu]);

  const handleToggle = () => {
    setLangageMenu((prev) => !prev);
  };

  return (
    <div ref={btnRef} className='relative'>
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        id={`${langageMenu}`}
        className='flex cursor-pointer items-center justify-between px-4 py-2.5 gap-2 w-fit border bg-white dark:bg-black dark:border-white h-[50px]'>
        <img
          id={`${selectedLang.desc}`}
          src={selectedLang.img || null} // Modifié pour passer null au lieu d'une chaîne vide
          alt={selectedLang.desc || ""}
          className='w-8 h-8'
        />
        <FaChevronDown
          className={`transition-transform ${langageMenu ? "rotate-180" : ""}`}
        />
      </div>
      {langageMenu && <MenuLangage />}
    </div>
  );
}
