import { whatsappLink } from '../config/site';
import { useLanguage } from '../i18n/useLanguage';
import { WhatsAppIcon } from './ui/BrandIcons';

export function WhatsAppButton() {
  const { t } = useLanguage();
  const href = whatsappLink(t.whatsapp.message);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#052E16] shadow-[0_12px_30px_-8px_rgba(37,211,102,0.55)] transition-[scale,box-shadow] duration-200 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-3 hidden rounded-lg border border-line-strong bg-background-secondary px-3 py-1.5 text-sm font-medium whitespace-nowrap text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
      >
        {t.whatsapp.tooltip}
      </span>
    </a>
  );
}
