'use client';

import { useRef } from 'react';
import { motion, useInView, type Target, type UseInViewOptions } from 'motion/react';
import type { ReactNode, CSSProperties } from 'react';

const DEFAULT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode;
  initial: Target;
  animate: Target;
  duration?: number;
  delay?: number;
  ease?: [number, number, number, number];
  margin?: UseInViewOptions['margin'];
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
