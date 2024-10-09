import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishTranslation from "../../locales/en/translation.json";
import arabicTranslation from "../../locales/ar-ae/translation.json";
import spanishTranslation from "../../locales/de/translation.json";
import portogesTranslation from '../../locales/pt/translation.json';

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en",
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: englishTranslation,
            },
            ar: {
                translation: arabicTranslation,
            },
            de: {
                translation: spanishTranslation
            },
            pt: {
                translation: portogesTranslation
            }
        },
    });

export default i18n;
