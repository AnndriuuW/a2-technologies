import { CalendarDays, ChartPie, Plus, Stethoscope, Users } from 'lucide-react';
import type { Locale } from '../../i18n/translations';

const copy = {
  es: {
    title: 'Agenda de hoy',
    sample: 'Datos de ejemplo',
    nav: ['Agenda', 'Pacientes', 'Tratamientos', 'Estadísticas'],
    hours: ['09:00', '10:00', '11:00', '12:00', '13:00'],
    appointments: ['Paciente A: control', 'Paciente B: limpieza', 'Paciente C: ortodoncia'],
    patients: 'Pacientes recientes',
    people: ['Paciente D', 'Paciente E', 'Paciente F'],
    stats: 'Citas por tipo',
  },
  en: {
    title: "Today's schedule",
    sample: 'Sample data',
    nav: ['Schedule', 'Patients', 'Treatments', 'Statistics'],
    hours: ['09:00', '10:00', '11:00', '12:00', '13:00'],
    appointments: ['Patient A: check-up', 'Patient B: cleaning', 'Patient C: orthodontics'],
    patients: 'Recent patients',
    people: ['Patient D', 'Patient E', 'Patient F'],
    stats: 'Appointments by type',
  },
};

const navIcons = [CalendarDays, Users, Stethoscope, ChartPie];
const slots = [
  { row: 0, x: 0, width: 200, fill: '#0F5C6E' },
  { row: 1.5, x: 40, width: 200, fill: '#0A6FE0' },
  { row: 3, x: 0, width: 220, fill: '#0F6E5C' },
];

export function OdontoCareMockup({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <svg viewBox="0 0 640 400" className="block size-full" aria-hidden="true">
      <rect width="640" height="400" fill="#061A26" />
      <rect width="640" height="52" fill="#04131D" />
      <circle cx="30" cy="26" r="13" fill="#0FA3A3" />
      <path
        d="M24 21c3-2 4 0 6 0s3-2 6 0c2 3-1 6-1.500 10-.5 2-2 2-2.500 0l-1-3c-.5-1-1.500-1-2 0l-1 3c-.5 2-2 2-2.500 0-.5-4-3.500-7-1.500-10Z"
        fill="#E8FBFB"
      />
      <text x="52" y="31" fill="#F4F7FC" fontSize="14" fontWeight="700">
        OdontoCare Manager
      </text>
      {text.nav.map((item, index) => {
        const Icon = navIcons[index]!;
        const x = 214 + index * 83;
        return (
          <g key={item}>
            <Icon x={x} y="19" width="13" height="13" color={index === 0 ? '#3FE0D0' : '#7FA0AE'} />
            <text x={x + 17} y="30" fill={index === 0 ? '#F4F7FC' : '#9DB8C4'} fontSize="10.5">
              {item}
            </text>
          </g>
        );
      })}

      <text x="20" y="84" fill="#F4F7FC" fontSize="16" fontWeight="700">
        {text.title}
      </text>
      <rect x="312" y="68" width="98" height="22" rx="11" fill="#0E3B45" />
      <text x="361" y="83" fill="#7FE7DD" fontSize="10.5" textAnchor="middle">
        {text.sample}
      </text>

      <rect x="20" y="100" width="390" height="282" rx="10" fill="#0B2733" stroke="#17404E" />
      {text.hours.map((hour, index) => {
        const y = 118 + index * 53;
        return (
          <g key={hour}>
            <text x="34" y={y + 4} fill="#9DB8C4" fontSize="11">
              {hour}
            </text>
            <line x1="82" x2="396" y1={y} y2={y} stroke="#17404E" />
          </g>
        );
      })}
      {slots.map((slot, index) => {
        const y = 124 + slot.row * 53;
        return (
          <g key={index}>
            <rect x={92 + slot.x} y={y} width={slot.width} height="62" rx="8" fill={slot.fill} />
            <rect x={92 + slot.x} y={y} width="4" height="62" rx="2" fill="#7FE7DD" />
            <text x={106 + slot.x} y={y + 26} fill="#fff" fontSize="12" fontWeight="600">
              {text.appointments[index]}
            </text>
            <rect x={106 + slot.x} y={y + 38} width="70" height="6" rx="3" fill="#ffffff55" />
          </g>
        );
      })}

      <rect x="422" y="68" width="200" height="152" rx="10" fill="#0B2733" stroke="#17404E" />
      <text x="436" y="92" fill="#B9D0D9" fontSize="12" fontWeight="600">
        {text.patients}
      </text>
      <Plus x="594" y="81" width="15" height="15" color="#3FE0D0" />
      {text.people.map((person, index) => {
        const y = 118 + index * 34;
        return (
          <g key={person}>
            <circle cx="448" cy={y} r="12" fill="#124552" />
            <text x="448" y={y + 4} fill="#7FE7DD" fontSize="10.5" textAnchor="middle">
              {person.slice(-1)}
            </text>
            <text x="468" y={y + 4} fill="#F4F7FC" fontSize="12">
              {person}
            </text>
          </g>
        );
      })}

      <rect x="422" y="232" width="200" height="150" rx="10" fill="#0B2733" stroke="#17404E" />
      <text x="436" y="256" fill="#B9D0D9" fontSize="12" fontWeight="600">
        {text.stats}
      </text>
      <g transform="rotate(-90 522 318)" fill="none" strokeWidth="14">
        <circle cx="522" cy="318" r="40" stroke="#124552" />
        <circle cx="522" cy="318" r="40" stroke="#3FE0D0" strokeDasharray="120 251" />
        <circle
          cx="522"
          cy="318"
          r="40"
          stroke="#0788FF"
          strokeDasharray="70 251"
          strokeDashoffset="-124"
        />
      </g>
    </svg>
  );
}
