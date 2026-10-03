/**
 * Motion design tokens & easing curves
 * Inspired by Linear, Apple, and Raycast
 */

export const transitions = {
  fast: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  normal: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  emphasis: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  entrance: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  exit: { duration: 0.12, ease: [0.7, 0, 0.84, 0] },
} as const;

export const easeOutQuad = [0.16, 1, 0.3, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;

/**
 * Standard subtle fade-up variant for hero & sections
 */
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: customDelay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
