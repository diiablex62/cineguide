import React, { useEffect, useRef, useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import fr from "../../assets/france.png";
import uk from "../../assets/royaume_uni.png";
import es from "../../assets/espagne.png";
import de from "../../assets/allemagne.png";

export default function LangageProvider({ children }) {
  const [langage, setLangage] = useState([
    {
      id: 1,
      langue: "fr",
      img: fr,
      desc: "drapeau langue française",
    },
    {
      id: 2,
      langue: "en",
      img: uk,
      desc: "drapeau langue anglaise",
    },
    {
      id: 3,
      langue: "es",
      img: es,
      desc: "drapeau langue espagnol",
    },
    {
      id: 4,
      langue: "de",
      img: de,
      desc: "drapeau langue allemande",
    },
  ]);
  const [langageMenu, setLangageMenu] = useState(false);

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
      value={{ langage, langageMenu, setLangageMenu, langageMenuRef }}>
      {children}
    </LangageContext.Provider>
  );
}
