import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./fr";
import en from "./en";
import es from "./es";
import de from "./de";

// Cherche le code langue dans le localStorage, sinon "fr"
const savedLangId = localStorage.getItem("selectedLangId");
const idToCode = { 1: "fr", 2: "en", 3: "es", 4: "de" };
const initialLang =
  idToCode[savedLangId] || localStorage.getItem("i18nextLng") || "fr";

console.log("[i18n] Initial language:", initialLang);

i18n.use(initReactI18next).init({
  resources: {
    fr,
    en,
    es,
    de,
  },
  lng: initialLang,
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
