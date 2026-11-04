import { m } from 'framer-motion';
import { Mail } from 'lucide-react';
import { team, type TeamMember } from '../data/team';
import { reveal, stagger, useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/useLanguage';
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons';
import { buttonStyles } from './ui/buttonStyles';
import { SocialLink } from './ui/SocialLink';

function Avatar({ member }: { member: TeamMember }) {
  const { t } = useLanguage();

  return (
    <div className="size-24 rounded-full bg-[linear-gradient(140deg,var(--primary-light),var(--primary-strong))] p-0.5 shadow-[0_0_38px_-8px_var(--primary)]">
      {member.photo ? (
        <img
          src={member.photo}
          alt={`${t.about.photoAlt} ${member.name}`}
          loading="lazy"
          width={92}
          height={92}
          className="size-full rounded-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${t.about.photoPlaceholder} ${member.name}`}
          className="flex size-full items-center justify-center rounded-full bg-background-secondary font-display text-3xl font-extrabold text-ink"
        >
          {member.name.slice(0, 2)}
        </div>
      )}
    </div>
  );
}

export function About() {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.25);

  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-titulo"
      className="section border-y border-line bg-background-secondary"
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <m.div {...animation} variants={reveal.slideRight}>
          <h2 id="nosotros-titulo" className="heading-2 flex items-center gap-3">
            <img src="/images/a2-logo.png" alt="A2" className="h-14 w-auto shrink-0 object-contain" />
            <span>Technologies</span>
          </h2>
          <p className="lead mt-5">{t.about.text}</p>
          <a href="#contacto" className={`${buttonStyles.secondary} mt-8`}>
            {t.about.cta}
          </a>
        </m.div>

        <m.ul {...animation} variants={stagger(0.15)} className="grid gap-5 sm:grid-cols-2">
          {team.map((member) => (
            <m.li key={member.id} variants={reveal.slideLeft}>
              <article className="flex h-full flex-col items-center rounded-2xl border border-line bg-card p-7 text-center transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-glow">
                <Avatar member={member} />
                <h3 className="mt-5 text-xl font-bold tracking-tight">{member.name}</h3>
                <p lang="en" className="mt-1 mb-5 flex-1 text-[0.9375rem] text-muted">
                  {member.role}
                </p>
                <div className="flex gap-2.5">
                  <SocialLink
                    label={`LinkedIn: ${member.name}`}
                    href={member.linkedin}
                    icon={LinkedInIcon}
                  />
                  <SocialLink
                    label={`GitHub: ${member.name}`}
                    href={member.github}
                    icon={GitHubIcon}
                  />
                  <SocialLink
                    label={`${t.about.emailLabel} ${member.name}`}
                    href={member.email && `mailto:${member.email}`}
                    icon={Mail}
                  />
                </div>
              </article>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
