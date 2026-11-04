import type { Localized } from '../i18n/translations';

export type MockupId = 'sigma' | 'odontocare' | 'bombero';

/**
 * Initial example projects. To publish a real capture, add the file to
 * public/images/projects/ and set `image` to its path (for example
 * '/images/projects/sigma.webp', 16:10 ratio) and `isDemo` to false.
 */
export interface Project {
  id: string;
  name: string;
  description: Localized;
  imageAlt: Localized;
  details: Localized;
  features: Localized[];
  mockup: MockupId;
  image?: string;
  isDemo: boolean;
}

export const projects: Project[] = [
  {
    id: 'sigma',
    name: 'SIGMA',
    description: {
      es: 'Sistema de gestión operativa y de recursos.',
      en: 'Operations and resource management system.',
    },
    imageAlt: {
      es: 'Interfaz de demostración de SIGMA: panel oscuro con indicadores, gráfico y navegación lateral.',
      en: 'SIGMA demo interface: dark dashboard with indicators, a chart and side navigation.',
    },
    details: {
      es: 'Un panel central para seguir la operación diaria y organizar los recursos de la empresa.',
      en: 'A central dashboard to follow daily operations and organize company resources.',
    },
    features: [
      { es: 'Indicadores operativos', en: 'Operational indicators' },
      { es: 'Control de recursos', en: 'Resource control' },
      { es: 'Reportes por área', en: 'Reports by area' },
    ],
    mockup: 'sigma',
    isDemo: true,
  },
  {
    id: 'odontocare',
    name: 'OdontoCare Manager',
    description: {
      es: 'Gestión integral para clínicas odontológicas.',
      en: 'End-to-end management for dental clinics.',
    },
    imageAlt: {
      es: 'Interfaz de demostración de OdontoCare Manager: agenda de citas, pacientes y estadísticas.',
      en: 'OdontoCare Manager demo interface: appointment schedule, patients and statistics.',
    },
    details: {
      es: 'Reúne la agenda, la información de pacientes y las estadísticas de la clínica en un solo lugar.',
      en: 'Brings the schedule, patient information and clinic statistics together in one place.',
    },
    features: [
      { es: 'Agenda de citas', en: 'Appointment schedule' },
      { es: 'Fichas de pacientes', en: 'Patient records' },
      { es: 'Estadísticas de la clínica', en: 'Clinic statistics' },
    ],
    mockup: 'odontocare',
    isDemo: true,
  },
  {
    id: 'bombero',
    name: 'Bombero Alert',
    description: {
      es: 'Aplicación de despacho y control de emergencias.',
      en: 'Emergency dispatch and control application.',
    },
    imageAlt: {
      es: 'Interfaz de demostración de Bombero Alert: emergencias activas, mapa y unidades con detalles rojos.',
      en: 'Bombero Alert demo interface: active emergencies, a map and units with red details.',
    },
    details: {
      es: 'Ayuda a registrar emergencias, asignar unidades y seguir cada atención en curso.',
      en: 'Helps record emergencies, assign units and follow each response in progress.',
    },
    features: [
      { es: 'Registro de emergencias', en: 'Emergency intake' },
      { es: 'Asignación de unidades', en: 'Unit assignment' },
      { es: 'Seguimiento de atención', en: 'Response tracking' },
    ],
    mockup: 'bombero',
    isDemo: true,
  },
];
