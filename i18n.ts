import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Si quieres importarlos estáticos:
import en from './src/locales/en.json';
import es from './src/locales/es.json';

// O si los cargas dinámicos vía HTTP usa HttpBackend
// import HttpBackend from 'i18next-http-backend';

i18n
  // .use(HttpBackend) // Si usas backend
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'es', // Idioma inicial
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
