import React, { useContext } from "react";
import { LangageContext } from "../../../context/LangageContext";
import { MenuContext } from "../../../context/MenuContext";

export default function MenuLangage() {
  const {
    LANGAGE_LIST,
    handleLanguageChange,
    selectedLang = { id: null },
  } = useContext(LangageContext) || {};
  const { burger } = useContext(MenuContext);

  const handleClick = (lang) => {
    handleLanguageChange(lang);
  };

  return (
    <div
      className={`${
        burger ? "relative" : "absolute"
      } top-full left-0 bg-white dark:bg-black border shadow-lg z-50`}
      style={{ width: "100%" }}>
      <div className='py-2'>
        {LANGAGE_LIST?.filter((lang) => lang.id !== selectedLang.id).map(
          (lang) => (
            <button
              key={lang.id}
              onClick={() => handleClick(lang)}
              className='w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
              <img src={lang.img} alt={lang.desc} className='w-8 h-8' />
            </button>
          )
        )}
      </div>
    </div>
  );
}
