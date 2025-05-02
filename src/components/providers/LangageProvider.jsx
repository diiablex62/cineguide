import React, { useState } from "react";
import { LangageContext } from "../../context/LangageContext";
import fr from "../../assets/france.png";
import uk from "../../assets/royaume_uni.png";
import es from "../../assets/espagne.png";
import de from "../../assets/allemagne.png";

// Définir la liste langage en dehors du composant pour garantir la stabilité
const LANGAGE_LIST = [
  { id: 1, img: fr, desc: "drapeau langue française" },
  { id: 2, img: uk, desc: "drapeau langue anglaise" },
  { id: 3, img: es, desc: "drapeau langue espagnol" },
  { id: 4, img: de, desc: "drapeau langue allemande" },
];

export default function LangageProvider({ children }) {
  const [langageMenu, setLangageMenu] = useState(false);

  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem("selectedLangId");
      const id = saved ? Number(saved) : null;
      const found = LANGAGE_LIST.find((l) => l.id === id);
      return found || LANGAGE_LIST[0];
    } catch {
      return LANGAGE_LIST[0];
    }
  });

  const desktopMenu = [
    { id: 1, label: "Accueil", path: "/" },
    { id: 2, label: "Films", path: "/films" },
    { id: 3, label: "Séries TV", path: "/series" },
    { id: 4, label: "À propos", path: "/about" },
  ];

  const handleLanguageChange = (lang) => {
    const found = LANGAGE_LIST.find((l) => l.id === lang.id);
    if (found) {
      setSelectedLang(found);
      setLangageMenu(false);
      localStorage.setItem("selectedLangId", found.id); // Stocke uniquement l'id
      console.log("Langue sélectionnée :", found); // Ajout log
    }
  };

  React.useEffect(() => {
    console.log("Provider rendu, selectedLang :", selectedLang);
  }, [selectedLang]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleLangageMenu = () => setLangageMenu((prev) => !prev);

  return (
    <LangageContext.Provider
      value={{
        langage: LANGAGE_LIST,
        desktopMenu,
        selectedLang,
        handleLanguageChange,
        langageMenu,
        setLangageMenu,
        toggleLangageMenu,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}>
      {children}
    </LangageContext.Provider>
  );
}
