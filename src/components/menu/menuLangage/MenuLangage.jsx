import React, { useContext, useEffect } from "react";
import { LangageContext } from "../../../context/LangageContext";

export default function MenuLangage() {
  const {
    langage = [],
    handleLanguageChange,
    selectedLang = { id: null },
  } = useContext(LangageContext) || {};

  useEffect(() => {
    console.log("MenuLangage rendu. Langue active:", selectedLang);
  }, [selectedLang]);

  const handleClick = (lang) => {
    console.log("Clic sur langue :", lang); // Ajout log
    handleLanguageChange(lang);
  };

  return (
    <div
      className='absolute top-full left-0 bg-white dark:bg-black border shadow-lg z-50'
      style={{ width: "100%" }}>
      {langage
        .filter((lang) => lang.id !== selectedLang.id)
        .map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleClick(lang)}
            className='flex items-center justify-center w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700'>
            <img src={lang.img} alt={lang.desc} className='w-8' />
          </button>
        ))}
    </div>
  );
}
