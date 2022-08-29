import LanguageDetector from "i18next-browser-languagedetector";
import en from "./translations/en.json";
import es from "./translations/es.json";
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

type Translation = typeof en;
type Resources = { [x: string]: { translation: Translation } };

const resources: Resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources,
});

export default i18n;
