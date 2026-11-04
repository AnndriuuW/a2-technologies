import { BarChart3, Check, Columns3, FileCheck2, Home, Search, Users } from 'lucide-react';
import { useLanguage } from '../../i18n/useLanguage';
import type { Locale } from '../../i18n/translations';
import { LogoMark } from '../ui/Logo';

/** No figures here on purpose: the hero illustrates how a project is followed, not results. */
const copy: Record<
  Locale,
  {
    board: string;
    project: string;
    nav: string[];
    columns: { title: string; cards: { title: string; tag: string; progress: number }[] }[];
    sprint: string;
    pipeline: string;
    steps: string[];
    phoneTitle: string;
    phoneSubtitle: string;
    milestones: string[];
  }
> = {
  es: {
    board: 'Tablero del proyecto',
    project: 'Plataforma de clientes',
    nav: ['Tablero', 'Entregas', 'Equipo', 'Reportes'],
    columns: [
      {
        title: 'Análisis',
        cards: [{ title: 'Flujo de aprobación', tag: 'Procesos', progress: 1 }],
      },
      {
        title: 'Diseño',
        cards: [
          { title: 'Portal de clientes', tag: 'Web', progress: 0.8 },
          { title: 'Inicio en la app', tag: 'Móvil', progress: 0.6 },
        ],
      },
      {
        title: 'Desarrollo',
        cards: [
          { title: 'Panel de ventas', tag: 'Web', progress: 0.7 },
          { title: 'Integración ERP', tag: 'API', progress: 0.45 },
        ],
      },
      {
        title: 'Entrega',
        cards: [{ title: 'Notificaciones', tag: 'Móvil', progress: 0.9 }],
      },
    ],
    sprint: 'Avance de la iteración',
    pipeline: 'Publicación',
    steps: ['Compilación', 'Pruebas', 'Despliegue'],
    phoneTitle: 'Tu proyecto',
    phoneSubtitle: 'Avance de la entrega',
    milestones: ['Diseño aprobado', 'API conectada', 'App en pruebas', 'Publicación'],
  },
  en: {
    board: 'Project board',
    project: 'Customer platform',
    nav: ['Board', 'Releases', 'Team', 'Reports'],
    columns: [
      {
        title: 'Analysis',
        cards: [{ title: 'Approval workflow', tag: 'Process', progress: 1 }],
      },
      {
        title: 'Design',
        cards: [
          { title: 'Customer portal', tag: 'Web', progress: 0.8 },
          { title: 'App home screen', tag: 'Mobile', progress: 0.6 },
        ],
      },
      {
        title: 'Development',
        cards: [
          { title: 'Sales dashboard', tag: 'Web', progress: 0.7 },
          { title: 'ERP integration', tag: 'API', progress: 0.45 },
        ],
      },
      {
        title: 'Delivery',
        cards: [{ title: 'Notifications', tag: 'Mobile', progress: 0.9 }],
      },
    ],
    sprint: 'Iteration progress',
    pipeline: 'Release',
    steps: ['Build', 'Tests', 'Deploy'],
    phoneTitle: 'Your project',
    phoneSubtitle: 'Delivery progress',
    milestones: ['Design approved', 'API connected', 'App in testing', 'Release'],
  },
};

const navIcons = [Columns3, FileCheck2, Users, BarChart3];

export function LaptopScreen() {
  const { locale } = useLanguage();
  const text = copy[locale];

  return (
    <svg viewBox="0 0 960 600" className="block size-full" aria-hidden="true">
      <defs>
        <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0788FF" stopOpacity=".45" />
          <stop offset="1" stopColor="#0788FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="960" height="600" fill="#07162B" />

      <rect width="176" height="600" fill="#041020" />
      <LogoMark x="22" y="22" width="34" height="34" />
      <text x="62" y="45" fill="#F4F7FC" fontSize="15" fontWeight="700">
        Technologies
      </text>
      {text.nav.map((item, index) => {
        const Icon = navIcons[index]!;
        const y = 94 + index * 46;
        const selected = index === 0;
        return (
          <g key={item}>
            {selected && <rect x="12" y={y} width="152" height="36" rx="8" fill="#0D2A4C" />}
            <Icon
              x="26"
              y={y + 10}
              width="16"
              height="16"
              color={selected ? '#00B7FF' : '#7F95AE'}
            />
            <text x="52" y={y + 23} fill={selected ? '#F4F7FC' : '#93A8BF'} fontSize="14">
              {item}
            </text>
          </g>
        );
      })}

      <text x="204" y="44" fill="#F4F7FC" fontSize="22" fontWeight="700">
        {text.board}
      </text>
      <text x="204" y="66" fill="#8EA5BE" fontSize="13">
        {text.project}
      </text>
      <rect x="696" y="26" width="160" height="34" rx="8" fill="#0D223D" />
      <Search x="708" y="35" width="16" height="16" color="#7F95AE" />
      <circle cx="884" cy="43" r="16" fill="#0A6FE0" />
      <circle cx="914" cy="43" r="16" fill="#0E8FC4" stroke="#07162B" strokeWidth="3" />

      {text.columns.map((column, columnIndex) => {
        const x = 204 + columnIndex * 184;
        return (
          <g key={column.title}>
            <rect x={x} y="88" width="172" height="282" rx="10" fill="#0A1C34" />
            <text x={x + 14} y="114" fill="#B8C7D9" fontSize="13" fontWeight="600">
              {column.title}
            </text>
            {column.cards.map((card, cardIndex) => {
              const y = 128 + cardIndex * 116;
              return (
                <g key={card.title}>
                  <rect
                    x={x + 10}
                    y={y}
                    width="152"
                    height="104"
                    rx="8"
                    fill="#0D2543"
                    stroke="#1E3B5E"
                  />
                  <rect x={x + 22} y={y + 12} width="46" height="18" rx="9" fill="#0D3B6E" />
                  <text x={x + 45} y={y + 25} fill="#7CCBFF" fontSize="10" textAnchor="middle">
                    {card.tag}
                  </text>
                  <text x={x + 22} y={y + 52} fill="#F4F7FC" fontSize="12.5" fontWeight="600">
                    {card.title}
                  </text>
                  <rect x={x + 22} y={y + 78} width="128" height="5" rx="2.5" fill="#1B3556" />
                  <rect
                    x={x + 22}
                    y={y + 78}
                    width={128 * card.progress}
                    height="5"
                    rx="2.5"
                    fill="#0788FF"
                  />
                </g>
              );
            })}
          </g>
        );
      })}

      <rect x="204" y="384" width="440" height="192" rx="10" fill="#0A1C34" />
      <text x="222" y="412" fill="#B8C7D9" fontSize="13" fontWeight="600">
        {text.sprint}
      </text>
      {[448, 488, 528].map((y) => (
        <line key={y} x1="222" x2="626" y1={y} y2={y} stroke="#14304F" />
      ))}
      <path
        d="M222 546C262 528 288 534 326 508s64-14 102-34 58-8 96-28 64-22 102-30V558H222Z"
        fill="url(#hero-area)"
      />
      <path
        d="M222 546C262 528 288 534 326 508s64-14 102-34 58-8 96-28 64-22 102-30"
        fill="none"
        stroke="#00B7FF"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <rect x="656" y="384" width="284" height="192" rx="10" fill="#0A1C34" />
      <text x="674" y="412" fill="#B8C7D9" fontSize="13" fontWeight="600">
        {text.pipeline}
      </text>
      {text.steps.map((step, index) => {
        const y = 430 + index * 46;
        const done = index < 2;
        return (
          <g key={step}>
            <circle
              cx="690"
              cy={y + 16}
              r="11"
              fill={done ? '#0A6FE0' : 'none'}
              stroke="#0788FF"
              strokeWidth="2"
            />
            {done ? (
              <Check x="683" y={y + 9} width="14" height="14" color="#fff" strokeWidth={3} />
            ) : (
              <circle cx="690" cy={y + 16} r="4" fill="#00B7FF" />
            )}
            <text x="714" y={y + 21} fill="#F4F7FC" fontSize="13.5">
              {step}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function PhoneScreen() {
  const { locale } = useLanguage();
  const text = copy[locale];

  return (
    <svg viewBox="0 0 300 634" className="block size-full" aria-hidden="true">
      <defs>
        <linearGradient id="phone-bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0C2C52" />
          <stop offset=".5" stopColor="#07162B" />
        </linearGradient>
      </defs>
      <rect width="300" height="634" fill="url(#phone-bg)" />
      <rect x="110" y="14" width="80" height="22" rx="11" fill="#020B18" />

      <circle cx="150" cy="146" r="72" fill="none" stroke="#17365A" strokeWidth="10" />
      <circle
        cx="150"
        cy="146"
        r="72"
        fill="none"
        stroke="#00B7FF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="330 453"
        transform="rotate(-90 150 146)"
      />
      <LogoMark x="110" y="106" width="80" height="80" />

      <text x="150" y="258" fill="#F4F7FC" fontSize="24" fontWeight="700" textAnchor="middle">
        {text.phoneTitle}
      </text>
      <text x="150" y="282" fill="#9FB4CB" fontSize="15" textAnchor="middle">
        {text.phoneSubtitle}
      </text>

      {text.milestones.map((milestone, index) => {
        const y = 310 + index * 62;
        const done = index < 2;
        const current = index === 2;
        return (
          <g key={milestone}>
            <rect x="20" y={y} width="260" height="52" rx="12" fill="#0D2543" />
            <circle
              cx="46"
              cy={y + 26}
              r="11"
              fill={done ? '#0A6FE0' : 'none'}
              stroke={done || current ? '#0788FF' : '#3C5674'}
              strokeWidth="2"
            />
            {done && (
              <Check x="39" y={y + 19} width="14" height="14" color="#fff" strokeWidth={3} />
            )}
            {current && <circle cx="46" cy={y + 26} r="4" fill="#00B7FF" />}
            <text x="68" y={y + 31} fill={index === 3 ? '#9FB4CB' : '#F4F7FC'} fontSize="15.5">
              {milestone}
            </text>
          </g>
        );
      })}

      <rect y="574" width="300" height="60" fill="#061224" />
      <Home x="52" y="592" width="24" height="24" color="#00B7FF" />
      <Columns3 x="138" y="592" width="24" height="24" color="#6C839C" />
      <Users x="224" y="592" width="24" height="24" color="#6C839C" />
    </svg>
  );
}
