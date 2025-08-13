import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files directly
import en from './resources/en.json';
import es from './resources/es.json';
import fr from './resources/fr.json';
import de from './resources/de.json';
import it from './resources/it.json';
import pt from './resources/pt.json';
import ru from './resources/ru.json';
import ja from './resources/ja.json';
import ko from './resources/ko.json';
import zh from './resources/zh.json';

// Language configuration with flag-icons CSS classes
export const languages = {
  en: { name: 'English', flag: 'us' },
  es: { name: 'Español', flag: 'es' },
  fr: { name: 'Français', flag: 'fr' },
  de: { name: 'Deutsch', flag: 'de' },
  it: { name: 'Italiano', flag: 'it' },
  pt: { name: 'Português', flag: 'pt' },
  ru: { name: 'Русский', flag: 'ru' },
  ja: { name: '日本語', flag: 'jp' },
  ko: { name: '한국어', flag: 'kr' },
  zh: { name: '中文', flag: 'cn' },
} as const;

export type LanguageCode = keyof typeof languages;

// Resources object with direct imports
const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  pt: { translation: pt },
  ru: { translation: ru },
  ja: { translation: ja },
  ko: { translation: ko },
  zh: { translation: zh },
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;