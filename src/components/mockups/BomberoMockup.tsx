import { Flame, MapPin, Radio, Siren, Truck } from 'lucide-react';
import type { Locale } from '../../i18n/translations';

const copy = {
  es: {
    title: 'Central de despacho',
    sample: 'Datos de ejemplo',
    incidents: 'Emergencias activas',
    list: [
      { type: 'Incendio', place: 'Zona norte' },
      { type: 'Rescate', place: 'Zona centro' },
      { type: 'Fuga de gas', place: 'Zona sur' },
    ],
    units: 'Unidades',
    states: ['En ruta', 'En escena', 'Disponible'],
  },
  en: {
    title: 'Dispatch center',
    sample: 'Sample data',
    incidents: 'Active emergencies',
    list: [
      { type: 'Fire', place: 'North zone' },
      { type: 'Rescue', place: 'Central zone' },
      { type: 'Gas leak', place: 'South zone' },
    ],
    units: 'Units',
    states: ['En route', 'On scene', 'Available'],
  },
};

const stateColors = ['#FFB020', '#FF5A4F', '#4FD6A0'];
const stateCounts = [2, 3, 5];
const incidentIcons = [Flame, Siren, Radio];

export function BomberoMockup({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <svg viewBox="0 0 640 400" className="block size-full" aria-hidden="true">
      <rect width="640" height="400" fill="#0E0F16" />
      <rect width="640" height="50" fill="#16111A" />
      <rect y="49" width="640" height="2" fill="#E5322D" />
      <Flame x="18" y="14" width="22" height="22" color="#FF5A4F" />
      <text x="48" y="31" fill="#F7F2F2" fontSize="15" fontWeight="800">
        Bombero Alert
      </text>
      <text x="170" y="31" fill="#BDB0B5" fontSize="12">
        {text.title}
      </text>
      <rect x="524" y="14" width="98" height="22" rx="11" fill="#3A1518" />
      <text x="573" y="29" fill="#FFB3AD" fontSize="10.5" textAnchor="middle">
        {text.sample}
      </text>

      <text x="18" y="80" fill="#F7F2F2" fontSize="13" fontWeight="700">
        {text.incidents}
      </text>
      {text.list.map((incident, index) => {
        const Icon = incidentIcons[index]!;
        const y = 94 + index * 72;
        return (
          <g key={incident.type}>
            <rect
              x="18"
              y={y}
              width="212"
              height="62"
              rx="9"
              fill={index === 0 ? '#2A1417' : '#191820'}
              stroke={index === 0 ? '#E5322D' : '#2C2A33'}
            />
            <circle cx="46" cy={y + 31} r="16" fill="#3A1518" />
            <Icon x="38" y={y + 23} width="16" height="16" color="#FF5A4F" />
            <text x="72" y={y + 27} fill="#F7F2F2" fontSize="13" fontWeight="600">
              {incident.type}
            </text>
            <text x="72" y={y + 45} fill="#BDB0B5" fontSize="11">
              {incident.place}
            </text>
          </g>
        );
      })}
      <rect x="18" y="310" width="212" height="72" rx="9" fill="#191820" stroke="#2C2A33" />
      <text x="32" y="334" fill="#F7F2F2" fontSize="12" fontWeight="600">
        {text.units}
      </text>
      {['#FFB020', '#FF5A4F', '#4FD6A0', '#4FD6A0'].map((color, index) => (
        <g key={index}>
          <rect x={32 + index * 46} y="346" width="38" height="24" rx="6" fill="#26242D" />
          <Truck x={38 + index * 46} y="351" width="14" height="14" color={color} />
          <circle cx={60 + index * 46} cy="358" r="3" fill={color} />
        </g>
      ))}

      <rect x="242" y="64" width="380" height="238" rx="10" fill="#13151E" stroke="#2C2A33" />
      <g stroke="#262833" strokeWidth="9" fill="none" strokeLinecap="round">
        <path d="M242 138c80 12 150-30 230-12s110-8 150 2" />
        <path d="M242 236c90-24 150 22 240 2s90-20 140-14" />
        <path d="M330 64c-16 70 22 130 0 238" />
        <path d="M498 64c20 70-20 150 8 238" />
      </g>
      <g stroke="#1C1E28" strokeWidth="4" fill="none">
        <path d="M242 188h380M412 64v238M560 64v238" />
      </g>
      <path
        d="M324 128c40-6 40 54 86 58s70-32 92-24"
        fill="none"
        stroke="#FF5A4F"
        strokeWidth="3"
        strokeDasharray="7 7"
        strokeLinecap="round"
      />
      <circle cx="502" cy="162" r="34" fill="#E5322D" opacity=".16" />
      <circle cx="502" cy="162" r="19" fill="#E5322D" opacity=".28" />
      <MapPin x="490" y="146" width="24" height="24" color="#FF5A4F" fill="#3A1518" />
      <rect x="310" y="114" width="28" height="28" rx="14" fill="#26242D" stroke="#FFB020" />
      <Truck x="316" y="120" width="16" height="16" color="#FFB020" />

      {text.states.map((state, index) => {
        const x = 242 + index * 130;
        return (
          <g key={state}>
            <rect x={x} y="314" width="120" height="68" rx="9" fill="#191820" stroke="#2C2A33" />
            <circle cx={x + 18} cy="338" r="5" fill={stateColors[index]} />
            <text x={x + 30} y="342" fill="#BDB0B5" fontSize="11">
              {state}
            </text>
            <text x={x + 14} y="368" fill="#F7F2F2" fontSize="18" fontWeight="700">
              {stateCounts[index]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
