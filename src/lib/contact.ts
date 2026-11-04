import { site } from '../config/site';
import type { Locale } from '../i18n/translations';
import type { ContactValues } from './validation';

const REQUEST_TIMEOUT_MS = 15_000;

export type ContactFailure =
  'notConfigured' | 'network' | 'timeout' | 'rejected' | 'rateLimited' | 'server';

export type ContactResult = { ok: true } | { ok: false; reason: ContactFailure };

export const isContactConfigured = () => Boolean(site.formspreeEndpoint);

/**
 * Sends the request to Formspree. Only a successful response from the service
 * counts as sent; every other outcome is returned as a failure to show the visitor.
 */
export async function sendContactRequest(
  values: ContactValues,
  locale: Locale,
  endpoint = site.formspreeEndpoint,
): Promise<ContactResult> {
  if (!endpoint) return { ok: false, reason: 'notConfigured' };

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        nombre: values.name,
        email: values.email,
        empresa: values.company || 'No indicada',
        tipo_proyecto: values.projectType,
        presupuesto: values.budget || 'No indicado',
        descripcion: values.message,
        privacidad_aceptada: values.privacy,
        idioma: locale,
        _subject: `Nueva solicitud: ${values.projectType} - ${values.name}`,
        _gotcha: values.website,
      }),
    });

    if (response.ok) return { ok: true };
    if (response.status === 429) return { ok: false, reason: 'rateLimited' };
    return { ok: false, reason: response.status >= 500 ? 'server' : 'rejected' };
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === 'AbortError';
    return { ok: false, reason: timedOut ? 'timeout' : 'network' };
  } finally {
    window.clearTimeout(timeout);
  }
}
