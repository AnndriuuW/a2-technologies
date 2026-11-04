import { m } from 'framer-motion';
import { Mail, MapPin, type LucideIcon } from 'lucide-react';
import { lazy, Suspense, type ComponentType, type ReactNode, type SVGProps } from 'react';
import { formatWhatsApp, site, WHATSAPP_NUMBER, whatsappLink } from '../config/site';
import { reveal, useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../i18n/useLanguage';
import { WhatsAppIcon } from './ui/BrandIcons';

const ContactForm = lazy(() => import('./ContactForm'));

interface ContactItemProps {
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  children: ReactNode;
}

function ContactItem({ icon: Icon, label, children }: ContactItemProps) {
  return (
    <li className="flex gap-4 py-4">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary-light">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        <div className="font-semibold break-words text-ink">{children}</div>
      </div>
    </li>
  );
}

const linkClass = 'underline-offset-4 hover:text-primary-light hover:underline';

export function Contact({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const { t } = useLanguage();
  const animation = useScrollAnimation(0.15);

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="section relative isolate overflow-clip"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_55%_at_82%_40%,rgba(7,136,255,0.13),transparent_70%)]"
      />
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <m.div {...animation} variants={reveal.slideRight}>
          <h2 id="contacto-titulo" className="heading-2">
            {t.contact.title}
          </h2>
          <p className="lead mt-4">{t.contact.description}</p>

          <h3 className="sr-only">{t.contact.infoTitle}</h3>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            <ContactItem icon={WhatsAppIcon} label={t.contact.whatsapp}>
              {WHATSAPP_NUMBER ? (
                <a
                  href={whatsappLink(t.whatsapp.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {formatWhatsApp(WHATSAPP_NUMBER)}
                </a>
              ) : (
                <>
                  {site.whatsappPlaceholder}
                  <span className="block text-sm font-normal text-muted">
                    {t.contact.whatsappPending}
                  </span>
                </>
              )}
            </ContactItem>
            <ContactItem icon={Mail} label={t.contact.email}>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </ContactItem>
            <ContactItem icon={MapPin} label={t.contact.location}>
              {site.location}
            </ContactItem>
          </ul>
        </m.div>

        <m.div
          {...animation}
          variants={reveal.slideUp}
          className="min-h-[46rem] rounded-2xl border border-line-strong bg-[linear-gradient(170deg,var(--background-card),var(--background-secondary))] p-5 shadow-[0_30px_80px_-40px_rgba(7,136,255,0.55)] sm:min-h-[42rem] sm:p-8"
        >
          <Suspense fallback={<p className="text-muted">{t.form.loading}</p>}>
            <ContactForm onOpenPrivacy={onOpenPrivacy} />
          </Suspense>
        </m.div>
      </div>
    </section>
  );
}
