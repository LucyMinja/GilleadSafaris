'use client';

import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// 3D tilt-on-hover — the card leans toward the cursor rather than sitting flat.
// Nothing else on the site does this, so it's reserved for WhatWeOffer's bento
// cards specifically rather than applied everywhere (which would just make it
// the new repeated formula instead of Ken Burns / mask reveals / segment bars).
export default function TiltCard({
  children,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 300, damping: 28, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), spring);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave(e: MouseEvent<HTMLDivElement>) {
    px.set(0);
    py.set(0);
    onMouseLeave?.(e);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
