import React, { useContext } from "react";
import { LangageContext } from "../../../context/LangageContext";

export default function MenuLangage() {
  const { langage, handleLanguageChange, selectedLang, langageMenuRef } =
    useContext(LangageContext);

  const otherLanguages = langage.filter((lang) => lang.id !== selectedLang.id);

  return (
    <div
      ref={langageMenuRef}
      className='absolute top-[calc(100%+5px)] right-0 bg-white dark:bg-black border shadow-lg'>
      {otherLanguages.map((lang) => (
        <button
          key={lang.id}
          onClick={() => handleLanguageChange(lang)}
          className='w-full flex justify-center items-center px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700'>
          <img src={lang.img} alt={lang.desc} className='w-8' />
        </button>
      ))}
    </div>
  );
}
