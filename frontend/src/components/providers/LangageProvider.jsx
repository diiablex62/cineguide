import React, { useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import fr from "../../assets/france.png";
import uk from "../../assets/royaume_uni.png";
import es from "../../assets/espagne.png";
import de from "../../assets/allemagne.png";

const LANGAGE_LIST = [
  { id: 1, code: "fr", img: fr, desc: "drapeau langue française" },
  { id: 2, code: "en", img: uk, desc: "drapeau langue anglaise" },
  { id: 3, code: "es", img: es, desc: "drapeau langue espagnole" },
  { id: 4, code: "de", img: de, desc: "drapeau langue allemande" },
];

export function LangageProvider({ children }) {
  const [langageMenu, setLangageMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedLangId");
      const id = saved ? Number(saved) : null;
      const found = LANGAGE_LIST.find((l) => l.id === id);
      return found || LANGAGE_LIST[0];
    } catch {
      console.log("[LangageProvider] Fallback to default language (fr)");
      return LANGAGE_LIST[0]; // Français par défaut
    }
  });

  const handleLanguageChange = (lang) => {
    const found = LANGAGE_LIST.find((l) => l.id === lang.id);
    if (found) {
      setSelectedLang(found);
      setLangageMenu(false);
      localStorage.setItem("selectedLangId", found.id);
    }
  };

  return (
    <LangageContext.Provider
      value={{
        langageMenu,
        setLangageMenu,
        selectedLang,
        handleLanguageChange,
        LANGAGE_LIST,
      }}>
      {children}
    </LangageContext.Provider>
  );
}
