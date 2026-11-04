import { z } from 'zod';
import type { Translations } from '../i18n/translations';

export type ContactErrorKey = keyof Translations['form']['errors'];

// Messages are translation keys, so visible errors follow the language selector.
const message = (key: ContactErrorKey) => key;

export const contactSchema = z.object({
  name: z.string().trim().min(1, message('nameRequired')).max(120),
  email: z
    .string()
    .trim()
    .min(1, message('emailRequired'))
    .pipe(z.email(message('emailInvalid')).max(180)),
  company: z.string().trim().max(160),
  projectType: z.string().min(1, message('projectTypeRequired')),
  budget: z.string(),
  message: z.string().trim().min(1, message('messageRequired')).max(4000),
  privacy: z.boolean().refine(Boolean, message('privacyRequired')),
  // Honeypot: stays empty for people and is hidden from them.
  website: z.string(),
});

export type ContactValues = z.infer<typeof contactSchema>;

export const contactDefaults: ContactValues = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
  privacy: false,
  website: '',
};
