import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./fr";
import en from "./en";
import es from "./es";
import de from "./de";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr,
      en,
      es,
      de,
    },
    lng: "fr",
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
