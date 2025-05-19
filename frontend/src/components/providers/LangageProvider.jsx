import React, { useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import fr from "../../assets/france.png";
import uk from "../../assets/royaume_uni.png";
import es from "../../assets/espagne.png";
import de from "../../assets/allemagne.png";

const LANGAGE_LIST = [
  { id: 1, code: "fr", img: fr, desc: "drapeau langue française" },
  { id: 2, code: "en", img: uk, desc: "drapeau langue anglaise" },
  { id: 3, code: "es", img: es, desc: "drapeau langue espagnol" },
  { id: 4, code: "de", img: de, desc: "drapeau langue allemande" },
];

export function LangageProvider({ children }) {
  const [langageMenu, setLangageMenu] = useState(false);

  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedLangId");
      const id = saved ? Number(saved) : null;
      const initialLang = LANGAGE_LIST.find((l) => l.id === 1); // Toujours français
      console.log(
        "[LangageProvider] Initial selectedLang (forcé fr):",
        initialLang
      );
      return initialLang;
    } catch {
      console.log("[LangageProvider] Fallback to default language (fr)");
      return LANGAGE_LIST[0]; // Français par défaut
    }
  });

  // Log à chaque render du Provider
  console.log("[LangageProvider] Render, selectedLang:", selectedLang);

  const handleLanguageChange = (lang) => {
    const found = LANGAGE_LIST.find((l) => l.id === lang.id);
    console.log(
      "[LangageProvider] handleLanguageChange called with:",
      lang,
      "found:",
      found
    );
    if (found) {
      setSelectedLang(found); // Met à jour l'état pour l'affichage du drapeau
      setLangageMenu(false);
      localStorage.setItem("selectedLangId", found.id); // Sauvegarde le choix pour la persistance de l'affichage
    }
  };

  const toggleLangageMenu = () => setLangageMenu((prev) => !prev);

  return (
    <LangageContext.Provider
      value={{
        langage: LANGAGE_LIST,
        selectedLang,
        handleLanguageChange,
        langageMenu,
        setLangageMenu,
        toggleLangageMenu,
      }}>
      {children}
    </LangageContext.Provider>
  );
}
