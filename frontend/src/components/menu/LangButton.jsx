import React, { useContext, useRef, useEffect, useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import MenuLangage from "./menuLangage/MenuLangage";
import { FaChevronDown } from "react-icons/fa";

export default function LangButton() {
  const {
    langageMenu,
    setLangageMenu,
    selectedLang = { img: "", desc: "" },
  } = useContext(LangageContext);
  const btnRef = useRef();

  useEffect(() => {
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
    <div ref={btnRef} className="relative">
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        id={`${langageMenu}`}
        className="flex cursor-pointer items-center justify-between px-4 py-2.5 gap-2 w-fit border bg-white dark:bg-black dark:border-white h-[50px]"
      >
        <img
          id={`${selectedLang.desc}`}
          src={selectedLang.img || ""}
          alt={selectedLang.desc || ""}
          className="w-8 h-8"
        />
        <FaChevronDown
          className={`transition-transform ${langageMenu ? "rotate-180" : ""}`}
        />
      </div>
      {langageMenu && <MenuLangage />}
    </div>
  );
}
