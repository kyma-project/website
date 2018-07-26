import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";
import { withPrefix } from "gatsby";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    load: "unspecific",
    fallbackLng: "en",
    ns: ["translations"],
    defaultNS: "translations",
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true
    },
    backend: {
      loadPath: withPrefix("/locales/{{lng}}/{{ns}}.json"),
    }
  });

export default i18n;
