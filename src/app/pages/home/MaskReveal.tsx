'use client';

import { motion } from 'motion/react';
import type { ReactNode, CSSProperties } from 'react';

/* ── Text block that drops down from behind a mask, blurring into focus.
   `viewport` switches it from an AnimatePresence enter/exit reveal (the
   Destinations carousel) to a scroll-triggered one-shot reveal (static
   grids like SafarisGrid) — same visual language, different trigger. ── */
export default function MaskReveal({
  children,
  delay = 0,
  duration = 0.55,
  ease = [0.22, 1, 0.36, 1],
  style,
  viewport = false,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  ease?: [number, number, number, number];
  style?: CSSProperties;
  viewport?: boolean;
}) {
  const hidden = { y: '-100%', opacity: 0, filter: 'blur(6px)' };
  const shown = { y: '0%', opacity: 1, filter: 'blur(0px)' };

  return (
    <div style={{ overflow: 'hidden', ...style }}>
      {viewport ? (
        <motion.div
          initial={hidden}
          whileInView={shown}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration, delay, ease }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          initial={hidden}
          animate={shown}
          exit={{ y: '40%', opacity: 0, filter: 'blur(4px)', transition: { duration: duration * 0.5, ease } }}
          transition={{ duration, delay, ease }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
