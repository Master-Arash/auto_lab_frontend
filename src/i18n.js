import i18n from "i18next";
import { initReactI18next } from "react-i18next";

async function loadLocale(locale) {
  const response = await fetch(`/locales/${locale}.json`);
  return await response.json();
}

export async function initI18n() {
  const faTranslations = await loadLocale("fa");

  await i18n.use(initReactI18next).init({
    resources: {
      fa: { translation: faTranslations },
    },
    lng: "fa", // default language
    fallbackLng: "fa",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
