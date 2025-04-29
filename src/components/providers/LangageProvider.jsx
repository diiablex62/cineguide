import React, { useEffect, useRef, useState } from "react";
import { LangageContext } from "../../context/LangageContext";

export default function LangageProvider({ children }) {
  const [langage, setLangage] = useState([
    {
      id: 1,
      langue: "fr",
      img: "/src/assets/france.png",
      desc: "drapeau langue française",
    },
    {
      id: 2,
      langue: "en",
      img: "/src/assets/royaume_uni.png",
      desc: "drapeau langue anglaise",
    },
    {
      id: 3,
      langue: "es",
      img: "/src/assets/espagne.png",
      desc: "drapeau langue espagnol",
    },
    {
      id: 4,
      langue: "de",
      img: "/src/assets/allemagne.png",
      desc: "drapeau langue allemande",
    },
  ]);
  const [langageMenu, setLangageMenu] = useState(false);

  //   const toggleLangage = () => {
  //     setLangageMenu();
  //   };

  //   const [menu, setMenu] = useState(false);
  const langageMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langageMenuRef.current &&
        !langageMenuRef.current.contains(event.target)
      ) {
        setLangageMenu(false);
      }
    };

    if (langageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langageMenu]);

  return (
    <LangageContext.Provider
      value={{ langage, langageMenu, setLangageMenu, langageMenuRef }}
    >
      {children}
    </LangageContext.Provider>
  );
}
