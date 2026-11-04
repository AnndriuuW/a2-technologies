const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-display font-bold transition-[background-color,border-color,box-shadow,color] duration-200';

export const buttonStyles = {
  primary: `${base} bg-primary-strong text-white hover:shadow-[0_10px_34px_-8px_var(--primary)] disabled:cursor-not-allowed disabled:opacity-70`,
  secondary: `${base} border border-line-strong text-ink hover:border-primary-light hover:bg-white/5`,
};
