import { m } from 'framer-motion';
import { reveal, stagger } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/useLanguage';
import { buttonStyles } from './ui/buttonStyles';
import { LogoMark } from './ui/Logo';
import { HeroVisual } from './mockups/HeroVisual';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-clip pt-[calc(var(--header-height)+clamp(2.5rem,6vw,4.5rem))] pb-16 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_78%_38%,rgba(7,136,255,0.2),transparent_70%),radial-gradient(40%_40%_at_8%_10%,rgba(0,183,255,0.07),transparent_70%)]"
      />
      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-10">
        <m.div initial="hidden" animate="visible" variants={stagger(0.16, 0.05)}>
          <m.p
            variants={reveal.fadeIn}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-background-secondary/70 py-1.5 pr-4 pl-2.5 text-sm font-semibold text-ink"
          >
            <LogoMark className="size-5" />
            A2 Technologies
          </m.p>
          <m.h1 variants={reveal.slideUp} className="heading-1 mt-6">
            {t.hero.titleStart} <span className="text-accent">{t.hero.titleAccent}</span>
          </m.h1>
          <m.p variants={reveal.slideUp} className="lead mt-6 max-w-[34rem]">
            {t.hero.description}
          </m.p>
          <m.div variants={reveal.slideUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className={buttonStyles.primary}>
              {t.hero.primaryCta}
            </a>
            <a href="#servicios" className={buttonStyles.secondary}>
              {t.hero.secondaryCta}
            </a>
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual label={t.hero.visualAlt} />
        </m.div>
      </div>
    </section>
  );
}
