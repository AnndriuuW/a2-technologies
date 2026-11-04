import { m } from 'framer-motion';
import { services } from '../data/services';
import { reveal, stagger, useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/useLanguage';
import { SectionHeading } from './ui/SectionHeading';

export function Services() {
  const { locale, t } = useLanguage();
  const animation = useScrollAnimation(0.2);

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="section border-y border-line bg-background-secondary"
    >
      <div className="container-page">
        <SectionHeading
          id="servicios-titulo"
          title={t.services.title}
          description={t.services.description}
        />

        <m.ul
          {...animation}
          variants={stagger(0.09)}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {services.map(({ id, icon: Icon, title, description }) => (
            <m.li key={id} variants={reveal.slideUp}>
              <article className="group h-full rounded-2xl border border-line bg-card p-6 transition-[translate,background-color,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-card-hover hover:shadow-glow lg:p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/12 text-primary-light">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{title[locale]}</h3>
                <p className="mt-2.5 text-muted">{description[locale]}</p>
              </article>
            </m.li>
          ))}
        </m.ul>

        <p className="mt-9 text-muted">
          {t.services.extra}{' '}
          <a
            href="#contacto"
            className="font-semibold text-primary-light underline decoration-primary-light/40 underline-offset-4 hover:decoration-primary-light"
          >
            {t.services.extraCta}
          </a>
        </p>
      </div>
    </section>
  );
}
