import i18n from "i18next";
import { initReactI18next } from "react-i18next";

async function loadLocale(locale) {
  const response = await fetch(`/locales/${locale}.json`);
  return await response.json();
}

export async function initI18n() {
  const enTranslations = await loadLocale("en");

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslations },
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
