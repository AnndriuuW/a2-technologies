/**
 * Company data and integrations. Everything that depends on the deployment
 * comes from environment variables (see .env.example).
 */

const clean = (value: string | undefined) => value?.trim() ?? '';

const url = (value: string | undefined) => {
  const candidate = clean(value);
  return /^https:\/\/\S+$/i.test(candidate) ? candidate : '';
};

const rawWhatsApp = clean(import.meta.env.VITE_WHATSAPP_NUMBER);

/** International format, digits only. Empty when missing or malformed, so no invalid link is built. */
export const WHATSAPP_NUMBER = /^[1-9]\d{7,14}$/.test(rawWhatsApp) ? rawWhatsApp : '';

export const site = {
  name: 'A2 Technologies',
  url: clean(import.meta.env.VITE_SITE_URL).replace(/\/+$/, ''),
  location: 'Lima, Perú',
  whatsappPlaceholder: '+51 991 510 915',
  email: clean(import.meta.env.VITE_CONTACT_EMAIL) || 'contacto@a2technologies.com',
  formspreeEndpoint: url(import.meta.env.VITE_FORMSPREE_ENDPOINT),
  social: {
    linkedin: url(import.meta.env.VITE_LINKEDIN_URL),
    github: url(import.meta.env.VITE_GITHUB_URL),
    instagram: url(import.meta.env.VITE_INSTAGRAM_URL),
  },
};

export const navSections = ['inicio', 'servicios', 'proyectos', 'nosotros', 'contacto'] as const;

export type SectionId = (typeof navSections)[number];

export function whatsappLink(message: string) {
  if (!WHATSAPP_NUMBER) return '';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Shows a configured number as +51 999 999 999. */
export function formatWhatsApp(number: string) {
  const local = number.slice(-9);
  const country = number.slice(0, -9);
  return `+${country} ${local.replace(/(\d{3})(?=\d)/g, '$1 ')}`.trim();
}
