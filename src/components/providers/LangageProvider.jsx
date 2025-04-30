import React, { useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import fr from "../../assets/france.png";
import uk from "../../assets/royaume_uni.png";
import es from "../../assets/espagne.png";
import de from "../../assets/allemagne.png";

export default function LangageProvider({ children }) {
  const [langageMenu, setLangageMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedLang");
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && parsed.img) return parsed;
      return { id: 1, img: fr, desc: "drapeau langue française" };
    } catch {
      return { id: 1, img: fr, desc: "drapeau langue française" };
    }
  });

  const langage = [
    { id: 1, img: fr, desc: "drapeau langue française" },
    { id: 2, img: uk, desc: "drapeau langue anglaise" },
    { id: 3, img: es, desc: "drapeau langue espagnol" },
    { id: 4, img: de, desc: "drapeau langue allemande" },
  ];

  const handleLanguageChange = (lang) => {
    setSelectedLang(lang);
    setLangageMenu(false);
    localStorage.setItem("selectedLang", JSON.stringify(lang));
  };

  const toggleLangageMenu = (e) => {
    setLangageMenu((prev) => !prev); // Inverse l'état actuel
    console.log(langageMenu);
  };

  const handleClickOutside = (event) => {
    if (
      langageMenuRef.current &&
      !langageMenuRef.current.contains(event.target)
    ) {
      setLangageMenu(false);
    }
    if (langageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  };

  useEffect(() => {}, [langageMenu]);

  return (
    <LangageContext.Provider
      value={{
        langage,
        selectedLang,
        handleLanguageChange,
        langageMenu,
        setLangageMenu,
        langageMenuRef,
        toggleLangageMenu, // Exporter la nouvelle fonction
      }}
    >
      {children}
    </LangageContext.Provider>
  );
}
