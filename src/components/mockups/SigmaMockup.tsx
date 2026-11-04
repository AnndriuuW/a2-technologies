import { Boxes, ClipboardList, Gauge, LineChart, Users } from 'lucide-react';
import type { Locale } from '../../i18n/translations';

const copy = {
  es: {
    title: 'Operación general',
    sample: 'Datos de ejemplo',
    nav: ['Resumen', 'Órdenes', 'Recursos', 'Personal', 'Reportes'],
    kpis: ['Órdenes', 'En curso', 'Recursos', 'Personal'],
    chart: 'Órdenes por semana',
    table: 'Recursos por área',
    areas: ['Almacén', 'Taller', 'Reparto'],
  },
  en: {
    title: 'Operations overview',
    sample: 'Sample data',
    nav: ['Overview', 'Orders', 'Resources', 'Staff', 'Reports'],
    kpis: ['Orders', 'In progress', 'Resources', 'Staff'],
    chart: 'Orders per week',
    table: 'Resources by area',
    areas: ['Warehouse', 'Workshop', 'Delivery'],
  },
};

const navIcons = [Gauge, ClipboardList, Boxes, Users, LineChart];
const kpiValues = ['128', '42', '86', '24'];
const bars = [46, 70, 58, 92, 74, 110, 86, 124];
const usage = [0.76, 0.54, 0.38];

export function SigmaMockup({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <svg viewBox="0 0 640 400" className="block size-full" aria-hidden="true">
      <rect width="640" height="400" fill="#07162B" />
      <rect width="124" height="400" fill="#041020" />
      <text x="20" y="34" fill="#F4F7FC" fontSize="17" fontWeight="800" letterSpacing="1">
        SIGMA
      </text>
      {text.nav.map((item, index) => {
        const Icon = navIcons[index]!;
        const y = 58 + index * 36;
        const selected = index === 0;
        return (
          <g key={item}>
            {selected && <rect x="8" y={y} width="108" height="30" rx="7" fill="#0D2A4C" />}
            <Icon
              x="18"
              y={y + 8}
              width="14"
              height="14"
              color={selected ? '#00B7FF' : '#7F95AE'}
            />
            <text x="40" y={y + 19.5} fill={selected ? '#F4F7FC' : '#93A8BF'} fontSize="11.5">
              {item}
            </text>
          </g>
        );
      })}

      <text x="142" y="34" fill="#F4F7FC" fontSize="16" fontWeight="700">
        {text.title}
      </text>
      <rect x="524" y="18" width="98" height="22" rx="11" fill="#0D3B6E" />
      <text x="573" y="33" fill="#7CCBFF" fontSize="10.5" textAnchor="middle">
        {text.sample}
      </text>

      {text.kpis.map((kpi, index) => {
        const x = 142 + index * 122;
        return (
          <g key={kpi}>
            <rect x={x} y="54" width="114" height="68" rx="9" fill="#0D223D" stroke="#1B3556" />
            <text x={x + 12} y="76" fill="#9FB4CB" fontSize="10.5">
              {kpi}
            </text>
            <text x={x + 12} y="104" fill="#F4F7FC" fontSize="21" fontWeight="700">
              {kpiValues[index]}
            </text>
            <path
              d={`M${x + 64} 104l10-9 9 5 10-13 9 6`}
              fill="none"
              stroke="#00B7FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      <rect x="142" y="134" width="296" height="248" rx="9" fill="#0D223D" stroke="#1B3556" />
      <text x="158" y="160" fill="#B8C7D9" fontSize="12" fontWeight="600">
        {text.chart}
      </text>
      {[210, 262, 314].map((y) => (
        <line key={y} x1="158" x2="422" y1={y} y2={y} stroke="#1B3556" />
      ))}
      {bars.map((height, index) => (
        <rect
          key={index}
          x={164 + index * 32}
          y={362 - height * 1.3}
          width="20"
          height={height * 1.3}
          rx="4"
          fill={index === bars.length - 1 ? '#00B7FF' : '#0A6FE0'}
        />
      ))}

      <rect x="450" y="134" width="172" height="248" rx="9" fill="#0D223D" stroke="#1B3556" />
      <text x="466" y="160" fill="#B8C7D9" fontSize="12" fontWeight="600">
        {text.table}
      </text>
      {text.areas.map((area, index) => {
        const y = 192 + index * 62;
        return (
          <g key={area}>
            <text x="466" y={y} fill="#F4F7FC" fontSize="12">
              {area}
            </text>
            <rect x="466" y={y + 12} width="140" height="8" rx="4" fill="#1B3556" />
            <rect x="466" y={y + 12} width={140 * usage[index]!} height="8" rx="4" fill="#0788FF" />
          </g>
        );
      })}
    </svg>
  );
}
