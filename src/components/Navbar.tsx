import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navSections } from '../config/site';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Locale } from '../i18n/translations';
import { useLanguage } from '../i18n/useLanguage';
import { buttonStyles } from './ui/buttonStyles';
import { Logo } from './ui/Logo';

const locales: Locale[] = ['es', 'en'];

function LanguageSwitch() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className="flex rounded-lg border border-line-strong p-0.5"
    >
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={locale === option}
          onClick={() => setLocale(option)}
          className={`min-h-9 min-w-9 rounded-md px-2 text-sm font-semibold transition-colors ${
            locale === option ? 'bg-primary-strong text-white' : 'text-muted hover:text-ink'
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md transition-[background-color,border-color] duration-300 ${
        solid ? 'border-line bg-background/90' : 'border-transparent bg-background/40'
      }`}
    >
      <div className="container-page flex h-(--header-height) items-center justify-between gap-4">
        <a href="#inicio" aria-label={t.nav.home} className="rounded-md">
          <Logo />
        </a>

        <nav aria-label={t.nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navSections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  className={`group relative block px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                    active === id ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {t.nav.links[id]}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary-light transition-transform duration-300 ${
                      active === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          <div className="hidden sm:block">
            <a href="#contacto" className={`${buttonStyles.primary} min-h-10! px-4! text-sm`}>
              {t.nav.cta}
            </a>
          </div>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-line-strong text-ink lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="menu-movil"
            aria-label={t.nav.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-line bg-background lg:hidden"
          >
            <ul className="container-page py-3">
              {navSections.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? 'location' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-12 items-center border-l-2 pl-4 font-display text-lg font-semibold ${
                      active === id ? 'border-primary-light text-ink' : 'border-line text-muted'
                    }`}
                  >
                    {t.nav.links[id]}
                  </a>
                </li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
