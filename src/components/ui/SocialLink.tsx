import type { ComponentType, SVGProps } from 'react';
import { useLanguage } from '../../i18n/useLanguage';

interface SocialLinkProps {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const base = 'inline-flex size-10 items-center justify-center rounded-lg border';

/** Without a configured URL it renders a dimmed, non-interactive icon instead of a dead link. */
export function SocialLink({ label, href, icon: Icon }: SocialLinkProps) {
  const { t } = useLanguage();

  if (!href) {
    const pending = `${label}: ${t.common.pending}`;
    return (
      <span
        role="img"
        aria-label={pending}
        title={pending}
        className={`${base} border-dashed border-line text-muted/45`}
      >
        <Icon className="size-[18px]" />
      </span>
    );
  }

  const external = href.startsWith('http');

  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${base} border-line-strong text-muted transition-colors hover:border-primary-light hover:bg-card-hover hover:text-primary-light`}
    >
      <Icon className="size-[18px]" />
    </a>
  );
}
