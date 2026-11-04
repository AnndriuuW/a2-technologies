import type { Localized } from '../i18n/translations';

export interface ContactOption {
  value: string;
  label: Localized;
}

/** `value` is what arrives in the inbox, so it stays in Spanish whatever the visitor's language. */
export const projectTypes: ContactOption[] = [
  { value: 'Desarrollo Web', label: { es: 'Desarrollo Web', en: 'Web Development' } },
  { value: 'Aplicación Móvil', label: { es: 'Aplicación Móvil', en: 'Mobile App' } },
  { value: 'Sistema Empresarial', label: { es: 'Sistema Empresarial', en: 'Business System' } },
  { value: 'Software a Medida', label: { es: 'Software a Medida', en: 'Custom Software' } },
  { value: 'Automatización', label: { es: 'Automatización', en: 'Automation' } },
  { value: 'Consultoría', label: { es: 'Consultoría', en: 'Consulting' } },
  { value: 'Otro', label: { es: 'Otro', en: 'Other' } },
];

export const budgets: ContactOption[] = [
  { value: 'Menos de S/ 1,000', label: { es: 'Menos de S/ 1,000', en: 'Under S/ 1,000' } },
  {
    value: 'S/ 1,000 – S/ 3,000',
    label: { es: 'S/ 1,000 – S/ 3,000', en: 'S/ 1,000 – S/ 3,000' },
  },
  {
    value: 'S/ 3,000 – S/ 5,000',
    label: { es: 'S/ 3,000 – S/ 5,000', en: 'S/ 3,000 – S/ 5,000' },
  },
  {
    value: 'S/ 5,000 – S/ 10,000',
    label: { es: 'S/ 5,000 – S/ 10,000', en: 'S/ 5,000 – S/ 10,000' },
  },
  { value: 'Más de S/ 10,000', label: { es: 'Más de S/ 10,000', en: 'Over S/ 10,000' } },
  { value: 'Por definir', label: { es: 'Por definir', en: 'To be defined' } },
];
