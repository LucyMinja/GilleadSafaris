'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
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
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  ease?: [number, number, number, number];
  style?: CSSProperties;
  viewport?: boolean;
  once?: boolean;
}) {
  const hidden = { y: '-100%', opacity: 0, filter: 'blur(6px)' };
  const shown = { y: '0%', opacity: 1, filter: 'blur(0px)' };

  const ref = useRef(null);
  // whileInView doesn't play the transition in this project's Motion setup —
  // useInView + a manually-toggled animate prop does. The ref is attached to
  // this stable, untransformed wrapper (not the inner motion.div that
  // carries the y:-100% transform) — attaching it to the transformed element
  // itself made the IntersectionObserver never report "in view" even when
  // the element was fully within the viewport.
  const inView = useInView(ref, { once, amount: 0.4 });

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      {viewport ? (
        <motion.div
          initial={hidden}
          animate={inView ? shown : hidden}
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
