'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

// Makes every motion.* animation site-wide respect the OS-level "reduce
// motion" setting automatically (Motion swaps transforms/opacity animations
// for instant or fade-only equivalents) — without touching any of the
// individual animated components.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
