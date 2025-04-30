import React, { useContext } from "react";
import { LangageContext } from "../../../context/LangageContext";
import { FaChevronUp } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

export default function MenuLangage() {
  const { langage, setLangageMenu, langageMenuRef } =
    useContext(LangageContext);
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn ? (
        <div
          ref={langageMenuRef}
          className="min-1100:absolute min-1100:mt-[156px] cursor-pointer z-50 min-1100:ml-[182px] bg-white border shadow-md dark:shadow-white dark:bg-black"
        >
          {langage.map((l) => (
            <div
              onClick={() => setLangageMenu(false)}
              key={l.id}
              className="flex items-center cursor-pointer justify-between px-4 py-2.5 max-1100:py-2.5 gap-2 w-fit bg-white dark:bg-black dark:border-white"
            >
              <img src={l.img} alt={l.desc} className="w-8" />
              {l.id === 1 ? <FaChevronUp /> : null}
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={langageMenuRef}
          className="min-1100:absolute min-1100:mt-[156px] cursor-pointer z-50 min-1100:ml-[340px] bg-white border shadow-md dark:shadow-white dark:bg-black"
        >
          {langage.map((l) => (
            <div
              onClick={() => setLangageMenu(false)}
              key={l.id}
              className="flex items-center cursor-pointer justify-between px-4 py-2.5 max-1100:py-2.5 gap-2 w-fit bg-white dark:bg-black dark:border-white"
            >
              <img src={l.img} alt={l.desc} className="w-8" />
              {l.id === 1 ? <FaChevronUp /> : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
