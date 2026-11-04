import { m } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { projects, type Project } from '../data/projects';
import { reveal, stagger, useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/useLanguage';
import { buttonStyles } from './ui/buttonStyles';
import { Modal } from './ui/Modal';
import { SectionHeading } from './ui/SectionHeading';

const ProjectMockup = lazy(() => import('./mockups/ProjectMockup'));

function ProjectMedia({ project }: { project: Project }) {
  const { locale } = useLanguage();
  const alt = project.imageAlt[locale];

  return (
    <div className="relative aspect-[8/5] overflow-hidden bg-background-secondary">
      {project.image ? (
        <img
          src={project.image}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <div role="img" aria-label={alt} className="size-full">
          <Suspense fallback={null}>
            <ProjectMockup id={project.mockup} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { locale, t } = useLanguage();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-glow">
      <ProjectMedia project={project} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="text-xl font-bold tracking-tight">{project.name}</h3>
          {project.isDemo && (
            <span className="rounded-md border border-line-strong px-1.5 py-0.5 text-xs font-medium text-muted">
              {t.common.demo}
            </span>
          )}
        </div>
        <p className="mt-2 mb-5 flex-1 text-muted">{project.description[locale]}</p>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${t.projects.viewDetailsOf} ${project.name}`}
          className="inline-flex min-h-10 items-center gap-1.5 self-start rounded-md font-semibold text-primary-light"
        >
          {t.projects.viewDetails}
          <ArrowUpRight
            className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}

export function Projects() {
  const { locale, t } = useLanguage();
  const animation = useScrollAnimation(0.12);
  const [selected, setSelected] = useState<Project | null>(null);

  const goToContact = () => {
    setSelected(null);
    requestAnimationFrame(() => document.getElementById('contacto')?.scrollIntoView());
  };

  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="section">
      <div className="container-page">
        <SectionHeading
          id="proyectos-titulo"
          title={t.projects.title}
          description={t.projects.description}
        />

        <m.ul
          {...animation}
          variants={stagger(0.14)}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <m.li
              key={project.id}
              variants={reveal.slideUp}
              className="md:max-lg:last:odd:col-span-2 md:max-lg:last:odd:mx-auto md:max-lg:last:odd:w-[calc(50%-0.75rem)]"
            >
              <ProjectCard project={project} onOpen={() => setSelected(project)} />
            </m.li>
          ))}
        </m.ul>

        <p className="mt-6 text-sm text-muted">{t.projects.notice}</p>
      </div>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
      >
        {selected && (
          <>
            <div className="overflow-hidden rounded-xl border border-line">
              <ProjectMedia project={selected} />
            </div>
            <p className="lead mt-5">{selected.details[locale]}</p>
            <h3 className="mt-6 text-lg font-bold">{t.projects.featuresTitle}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {selected.features.map((feature) => (
                <li key={feature.es} className="flex items-center gap-2 text-muted">
                  <Check className="size-4 shrink-0 text-primary-light" aria-hidden="true" />
                  {feature[locale]}
                </li>
              ))}
            </ul>
            {selected.isDemo && (
              <p className="mt-5 text-sm text-muted">{t.projects.detailNotice}</p>
            )}
            <button type="button" onClick={goToContact} className={`${buttonStyles.primary} mt-6`}>
              {t.projects.similarCta}
            </button>
          </>
        )}
      </Modal>
    </section>
  );
}
