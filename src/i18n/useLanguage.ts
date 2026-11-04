import { createContext, useContext } from 'react';
import type { Locale, Translations } from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
