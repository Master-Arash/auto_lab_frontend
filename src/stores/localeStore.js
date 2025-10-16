import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n";

export const useLocaleStore = create(
    persist(
        (set) => ({
            locale: i18n.language, // default language
            setLocale: async (newLocale) => {
                // Load locale JSON dynamically
                const response = await fetch(`/locales/${newLocale}.json`);
                const translations = await response.json();

                // Change i18next language
                await i18n.addResourceBundle(newLocale, "translation", translations, true, true);
                await i18n.changeLanguage(newLocale);

                // Update store
                set({ locale: newLocale });
            },
        }),
        { name: "locale-storage" } // key in localStorage
    )
);
