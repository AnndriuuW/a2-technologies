import { site } from '../config/site';
import { useLanguage } from '../i18n/useLanguage';
import { Modal } from './ui/Modal';

interface PrivacyPolicyProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyPolicy({ open, onClose }: PrivacyPolicyProps) {
  const { t } = useLanguage();

  return (
    <Modal open={open} onClose={onClose} title={t.privacy.title}>
      <p className="rounded-lg border border-line-strong bg-background/50 p-3 text-sm text-muted">
        {t.privacy.draftNotice}
      </p>
      {t.privacy.sections.map((section) => (
        <section key={section.title} className="mt-5">
          <h3 className="text-lg font-bold">{section.title}</h3>
          <p className="mt-1 text-muted">{section.body}</p>
        </section>
      ))}
      <p className="mt-6 text-muted">
        <a
          href={`mailto:${site.email}`}
          className="font-semibold text-primary-light underline underline-offset-2"
        >
          {site.email}
        </a>
      </p>
    </Modal>
  );
}
