import React, { useEffect, useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import fr from "../../assets/france.png";
import uk from "../../assets/royaume_uni.png";
import es from "../../assets/espagne.png";
import de from "../../assets/allemagne.png";
import i18n from "../../Langue/i18n";

const LANGAGE_LIST = [
  { id: 1, code: "fr", img: fr, desc: "drapeau langue française" },
  { id: 2, code: "en", img: uk, desc: "drapeau langue anglaise" },
  { id: 3, code: "es", img: es, desc: "drapeau langue espagnol" },
  { id: 4, code: "de", img: de, desc: "drapeau langue allemande" },
];

export default function LangageProvider({ children }) {
  const [langageMenu, setLangageMenu] = useState(false);

  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedLangId");
      const id = saved ? Number(saved) : null;
      const found = LANGAGE_LIST.find((l) => l.id === id);
      console.log(
        "[LangageProvider] Initial selectedLang:",
        found || LANGAGE_LIST[0]
      );
      return found || LANGAGE_LIST[0];
    } catch {
      console.log("[LangageProvider] Fallback to default language");
      return LANGAGE_LIST[0];
    }
  });

  // Log à chaque render du Provider
  console.log("[LangageProvider] Render, selectedLang:", selectedLang);

  // Synchronise la langue i18n à chaque changement de selectedLang
  useEffect(() => {
    console.log("[LangageProvider] useEffect selectedLang:", selectedLang);
    if (selectedLang && selectedLang.code) {
      i18n.changeLanguage(selectedLang.code).then(() => {
        console.log(
          "[LangageProvider] i18n.changeLanguage called with:",
          selectedLang.code
        );
      });
    }
  }, [selectedLang]);

  const handleLanguageChange = (lang) => {
    const found = LANGAGE_LIST.find((l) => l.id === lang.id);
    console.log(
      "[LangageProvider] handleLanguageChange called with:",
      lang,
      "found:",
      found
    );
    if (found) {
      setSelectedLang(found);
      setLangageMenu(false);
      localStorage.setItem("selectedLangId", found.id);
      if (found.code) {
        i18n.changeLanguage(found.code).then(() => {
          console.log(
            "[LangageProvider] i18n.changeLanguage (immediate) called with:",
            found.code
          );
        });
      }
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
