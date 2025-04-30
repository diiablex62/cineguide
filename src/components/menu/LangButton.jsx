import React, { useContext, useRef, useEffect } from "react";
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

  // Click outside pour fermer le menu
  useEffect(() => {
    if (!langageMenu) return;
    const handleClick = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setLangageMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [langageMenu, setLangageMenu]);

  const handleToggle = () => {
    setLangageMenu((prev) => !prev);
  };

  return (
    <div ref={btnRef} className="relative">
      <div
        onClick={handleToggle}
        className="flex cursor-pointer items-center justify-between px-4 py-2.5 gap-2 w-fit border bg-white dark:bg-black dark:border-white h-[50px]"
      >
        <img
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
