import type { ReactNode } from 'react';
import { navSections, site } from '../config/site';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { useLanguage } from '../i18n/useLanguage';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './ui/BrandIcons';
import { Logo } from './ui/Logo';
import { SocialLink } from './ui/SocialLink';

const linkClass = 'text-muted transition-colors hover:text-ink';

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-body text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-2 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

export function Footer({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const { locale, t } = useLanguage();

  return (
    <footer className="border-t border-line bg-background-secondary">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#inicio" aria-label={t.nav.home} className="inline-block rounded-md">
              <Logo />
            </a>
            <p className="mt-3 max-w-xs text-[0.9375rem] text-muted">{t.footer.tagline}</p>
            <div className="mt-5 flex gap-2.5" role="group" aria-label={t.footer.social}>
              <SocialLink label="LinkedIn" href={site.social.linkedin} icon={LinkedInIcon} />
              <SocialLink label="GitHub" href={site.social.github} icon={GitHubIcon} />
              <SocialLink label="Instagram" href={site.social.instagram} icon={InstagramIcon} />
            </div>
          </div>

          <FooterColumn title={t.footer.navigation}>
            {navSections.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {t.nav.links[id]}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={t.footer.services}>
            {services.map((service) => (
              <li key={service.id}>
                <a href="#servicios" className={linkClass}>
                  {service.title[locale]}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={t.footer.projects}>
            {projects.map((project) => (
              <li key={project.id}>
                <a href="#proyectos" className={linkClass}>
                  {project.name}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={t.footer.contact}>
            <li className="break-words">
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li className="text-muted">{site.location}</li>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 pb-16 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:pb-0">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="self-start underline underline-offset-4 hover:text-ink sm:self-auto"
          >
            {t.footer.privacy}
          </button>
        </div>
      </div>
    </footer>
  );
}
