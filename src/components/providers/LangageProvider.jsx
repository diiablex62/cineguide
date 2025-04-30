import React, { useEffect, useRef, useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import fr from "../../assets/france.png";
import uk from "../../assets/royaume_uni.png";
import es from "../../assets/espagne.png";
import de from "../../assets/allemagne.png";

export default function LangageProvider({ children }) {
  const [langageMenu, setLangageMenu] = useState(false);
  const langageMenuRef = useRef(null);
  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedLang");
      return saved
        ? JSON.parse(saved)
        : { id: 1, img: fr, desc: "drapeau langue française" };
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
    setLangageMenu(false); // Force le menu à se fermer
    localStorage.setItem("selectedLang", JSON.stringify(lang));
  };

  const toggleLanguageMenu = (e) => {
    e.stopPropagation(); // Empêche la propagation de l'événement
    setLangageMenu((prev) => !prev); // Inverse l'état actuel
  };

  const handleClickOutside = (event) => {
    if (
      langageMenuRef.current &&
      !langageMenuRef.current.contains(event.target)
    ) {
      setLangageMenu(false);
    }
  };

  useEffect(() => {
    if (langageMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langageMenu]);

  return (
    <LangageContext.Provider
      value={{
        langage,
        selectedLang,
        handleLanguageChange,
        langageMenu,
        setLangageMenu,
        langageMenuRef,
        toggleLanguageMenu, // Exporter la nouvelle fonction
      }}>
      {children}
    </LangageContext.Provider>
  );
}
