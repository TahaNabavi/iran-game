import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInFa from "../locales/fa/translation.json";

// the translations
const resources = {
  fa: {
    translation: translationsInFa,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "fa",
  debug: true,
  fallbackLng: "fa",
  interpolation: {
    escapeValue: false,
  },
  ns: "translation",
  defaultNS: "translation",
});

export default i18n;

