import { Code2, Layers, Monitor, Smartphone, type LucideIcon } from 'lucide-react';
import type { Localized } from '../i18n/translations';

export interface Service {
  id: string;
  icon: LucideIcon;
  title: Localized;
  description: Localized;
}

export const services: Service[] = [
  {
    id: 'web',
    icon: Monitor,
    title: { es: 'Desarrollo Web', en: 'Web Development' },
    description: {
      es: 'Sistemas web modernos, seguros y escalables.',
      en: 'Modern, secure and scalable web systems.',
    },
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: { es: 'Apps Móviles', en: 'Mobile Apps' },
    description: {
      es: 'Aplicaciones nativas e híbridas para Android e iOS.',
      en: 'Native and hybrid applications for Android and iOS.',
    },
  },
  {
    id: 'enterprise',
    icon: Layers,
    title: { es: 'Sistemas Empresariales', en: 'Business Systems' },
    description: {
      es: 'Soluciones como ERP, CRM y gestión operativa.',
      en: 'Solutions such as ERP, CRM and operations management.',
    },
  },
  {
    id: 'custom',
    icon: Code2,
    title: { es: 'Software a Medida', en: 'Custom Software' },
    description: {
      es: 'Desarrollo personalizado según las necesidades de tu negocio.',
      en: 'Tailored development for the needs of your business.',
    },
  },
];
