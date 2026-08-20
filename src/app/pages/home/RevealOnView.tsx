'use client';

import { useRef } from 'react';
import { motion, useInView, type Target } from 'motion/react';
import type { ReactNode, CSSProperties } from 'react';

const DEFAULT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Motion's declarative `whileInView` prop doesn't play the transition in
// this project's setup — elements snap straight to their target state the
// instant they're observed, instead of easing in. The imperative
// useInView() hook + a manually-toggled `animate` prop does animate
// correctly, so every scroll-triggered reveal on the homepage goes through
// this wrapper instead of `whileInView` directly.
export default function RevealOnView({
  children,
  initial,
  animate,
  duration = 0.5,
  delay = 0,
  ease = DEFAULT_EASE,
  margin = '-60px',
  once = true,
  className,
  style,
  id,
}: {
  children: ReactNode;
  initial: Target;
  animate: Target;
  duration?: number;
  delay?: number;
  ease?: [number, number, number, number];
  margin?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration, delay, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
