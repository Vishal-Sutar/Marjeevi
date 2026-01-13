import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resources } from "./resources";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (callback) => {
    const lang = await AsyncStorage.getItem("APP_LANGUAGE");
    callback(lang || "en");
  },
  init: () => {},
  cacheUserLanguage: async (lang) => {
    await AsyncStorage.setItem("APP_LANGUAGE", lang);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
