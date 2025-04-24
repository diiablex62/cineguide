import React, { useContext } from "react";
import { LangageContext } from "../../../context/LangageContext";
import { FaChevronUp } from "react-icons/fa";

export default function MenuLangageDesktop() {
  const { langage, setLangageMenu, langageMenuRef } =
    useContext(LangageContext);
  return (
    <>
      <div
        ref={langageMenuRef}
        className="absolute right-0 bg-white border shadow-md dark:shadow-white dark:bg-black"
      >
        {langage.map((l) => (
          <div
            key={l.id}
            className="flex items-center justify-between px-4 py-2.5 cursor-pointer gap-2"
          >
            <img src={l.img} alt={l.desc} className="w-8" />
            {l.id === 1 ? (
              <FaChevronUp onClick={() => setLangageMenu(false)} />
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
