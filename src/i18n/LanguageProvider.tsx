import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { LanguageContext } from './useLanguage';
import { translations, type Locale } from './translations';

const STORAGE_KEY = 'a2-language';

function readStoredLocale(): Locale {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readStoredLocale);
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // The choice simply lasts for this visit when storage is blocked.
    }
  }, [locale, t]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
