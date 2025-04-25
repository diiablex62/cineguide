import React, { useContext } from "react";
import { LangageContext } from "../../../context/LangageContext";
import { FaChevronUp } from "react-icons/fa";

export default function MenuLangage() {
  const { langage, setLangageMenu, langageMenuRef } =
    useContext(LangageContext);
  return (
    // <div className="relative">
    <div
      ref={langageMenuRef}
      className="min-1100:absolute z-50 right-8 bg-white border shadow-md dark:shadow-white dark:bg-black"
    >
      {langage.map((l) => (
        <div
          key={l.id}
          className="flex items-center justify-between px-4 py-3 max-1100:py-2.5 gap-2 w-[88px] bg-white dark:bg-black dark:border-white"
        >
          <img src={l.img} alt={l.desc} className="w-8" />
          {l.id === 1 ? (
            <FaChevronUp onClick={() => setLangageMenu(false)} />
          ) : null}
        </div>
      ))}
    </div>
    // </div>
  );
}
