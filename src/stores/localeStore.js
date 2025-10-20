import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n";

export const useLocaleStore = create(
  persist(
    (set) => ({
      locale: i18n.language,
      setLocale: async (newLocale) => {
        const response = await fetch(`/locales/${newLocale}.json`);
        const translations = await response.json();

        await i18n.addResourceBundle(
          newLocale,
          "translation",
          translations,
          true,
          true,
        );
        await i18n.changeLanguage(newLocale);

        set({ locale: newLocale });
      },
    }),
    { name: "locale-storage" },
  ),
);
