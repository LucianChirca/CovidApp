import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../assets/translations/en.json';
import nl from '../assets/translations/nl.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      nl: {
        translation: nl,
      },
    },
    lng: 'nl',
    fallbackLng: false,
    debug: false,
    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
