import type { SVGProps } from 'react';

/** Placeholder brand mark. Replace these paths (and public/favicon.svg) with the final logo. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <g strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 35.5 15.5 12.5l9 23M10 28h11" stroke="#00B7FF" />
        <path d="M28.5 18.5a6 6 0 1 1 10.5 4L28.5 35.5H41" stroke="#00B7FF" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <img src="/images/a2-logo.png" alt="A2" className="h-10 w-auto object-contain" />
      <span className="font-display text-lg font-semibold tracking-tight text-ink">Technologies</span>
    </span>
  );
}
