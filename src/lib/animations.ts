import type { Variants } from "framer-motion";

const premiumEase = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: premiumEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: premiumEase },
  },
};

export function stagger(delay = 0.15): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
      },
    },
  };
}
