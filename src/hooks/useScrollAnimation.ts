import type { HTMLMotionProps, Variants } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

/** Variations used per section so the page does not repeat one entrance everywhere. */
export const reveal = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
  },
} satisfies Record<string, Variants>;

export const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Reveal once when entering the viewport; elements never replay while scrolling. */
export function useScrollAnimation(amount = 0.25) {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount },
  } satisfies HTMLMotionProps<'div'>;
}
