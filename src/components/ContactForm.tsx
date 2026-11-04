import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useForm, type FieldError as HookFieldError } from 'react-hook-form';
import { site } from '../config/site';
import { budgets, projectTypes } from '../data/contactOptions';
import { useLanguage } from '../i18n/useLanguage';
import { isContactConfigured, sendContactRequest, type ContactFailure } from '../lib/contact';
import {
  contactDefaults,
  contactSchema,
  type ContactErrorKey,
  type ContactValues,
} from '../lib/validation';
import { buttonStyles } from './ui/buttonStyles';

type Status = { kind: 'idle' } | { kind: 'success' } | { kind: 'failure'; reason: ContactFailure };

function FieldError({ id, error }: { id: string; error?: HookFieldError }) {
  const { t } = useLanguage();
  if (!error?.message) return null;

  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {t.form.errors[error.message as ContactErrorKey]}
    </p>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: HookFieldError;
  className?: string;
  children: ReactNode;
}

function Field({ id, label, required, optionalLabel, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-primary-light">
            *
          </span>
        )}
        {optionalLabel && <span className="ml-1.5 font-normal text-muted">({optionalLabel})</span>}
      </label>
      {children}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function Mailto() {
  return (
    <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
      {site.email}
    </a>
  );
}

export default function ContactForm({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const { locale, t } = useLanguage();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const sending = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: contactDefaults,
  });

  useEffect(() => {
    if (status.kind === 'success') successRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: ContactValues) => {
    setStatus({ kind: 'idle' });

    const result = await sendContactRequest(values, locale);

    if (result.ok) {
      reset();
      setStatus({ kind: 'success' });
    } else {
      setStatus({ kind: 'failure', reason: result.reason });
    }
  };

  // Blocks a second submit even if it fires before the disabled state reaches the button.
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    await handleSubmit(onSubmit)(event);
    sending.current = false;
  };

  const describe = (id: string, error?: HookFieldError) => ({
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
  });

  if (status.kind === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex h-full min-h-80 flex-col items-center justify-center text-center outline-none"
      >
        <CheckCircle2 className="size-14 text-success" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold tracking-tight">{t.form.successTitle}</h3>
        <p className="mt-2 max-w-sm text-muted">{t.form.successText}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className={`${buttonStyles.secondary} mt-7`}
        >
          {t.form.sendAnother}
        </button>
      </div>
    );
  }

  const failed = status.kind === 'failure';

  return (
    <form onSubmit={submit} noValidate>
      <h3 className="text-2xl font-bold tracking-tight">{t.form.title}</h3>
      <p className="mt-1 text-sm text-muted">{t.form.required}</p>

      {!isContactConfigured() && (
        <div className="mt-5 flex gap-3 rounded-lg border border-line-strong bg-background/50 p-4 text-sm text-muted">
          <Info className="mt-0.5 size-5 shrink-0 text-primary-light" aria-hidden="true" />
          <div>
            <p className="font-semibold text-ink">{t.form.status.notConfiguredTitle}</p>
            <p className="mt-0.5">
              {t.form.status.notConfiguredText} <Mailto />.
            </p>
            {import.meta.env.DEV && <p className="mt-1">{t.form.status.notConfiguredDev}</p>}
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.form.name} required error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            placeholder={t.form.namePlaceholder}
            className="field"
            {...describe('name', errors.name)}
            {...register('name')}
          />
        </Field>

        <Field id="email" label={t.form.email} required error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-required="true"
            placeholder={t.form.emailPlaceholder}
            className="field"
            {...describe('email', errors.email)}
            {...register('email')}
          />
        </Field>

        <Field id="company" label={t.form.company} optionalLabel={t.form.optional}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder={t.form.companyPlaceholder}
            className="field"
            {...register('company')}
          />
        </Field>

        <Field id="projectType" label={t.form.projectType} required error={errors.projectType}>
          <select
            id="projectType"
            aria-required="true"
            className="field"
            {...describe('projectType', errors.projectType)}
            {...register('projectType')}
          >
            <option value="">{t.form.projectTypePlaceholder}</option>
            {projectTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[locale]}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="budget"
          label={t.form.budget}
          optionalLabel={t.form.optional}
          className="sm:col-span-2"
        >
          <select id="budget" className="field" {...register('budget')}>
            <option value="">{t.form.budgetPlaceholder}</option>
            {budgets.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[locale]}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="message"
          label={t.form.message}
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            rows={5}
            aria-required="true"
            placeholder={t.form.messagePlaceholder}
            className="field resize-y"
            {...describe('message', errors.message)}
            {...register('message')}
          />
        </Field>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <div className="mt-5">
        <div className="flex items-start gap-3">
          <input
            id="privacy"
            type="checkbox"
            aria-required="true"
            className="mt-0.5 size-5 shrink-0 accent-primary-strong"
            {...describe('privacy', errors.privacy)}
            {...register('privacy')}
          />
          <p className="text-[0.9375rem] text-muted">
            <label htmlFor="privacy">{t.form.privacyStart}</label>{' '}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="font-semibold text-primary-light underline underline-offset-2"
            >
              {t.form.privacyLink}
            </button>
            <span aria-hidden="true" className="ml-0.5 text-primary-light">
              *
            </span>
          </p>
        </div>
        <FieldError id="privacy-error" error={errors.privacy} />
      </div>

      {failed && (
        <div
          role="alert"
          className="mt-5 flex gap-3 rounded-lg border border-danger/60 bg-danger/10 p-4 text-sm text-ink"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
          {status.reason === 'notConfigured' ? (
            <p>
              {t.form.status.notSent} <Mailto />.
            </p>
          ) : (
            <p>{t.form.status[status.reason]}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className={`${buttonStyles.primary} mt-6 w-full sm:w-auto`}
      >
        {isSubmitting && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
        {isSubmitting ? t.form.submitting : failed ? t.form.retry : t.form.submit}
      </button>
    </form>
  );
}
