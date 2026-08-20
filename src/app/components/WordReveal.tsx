'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { CSSProperties } from 'react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Splits a paragraph into words and reveals them in a cascading wave — each
// word rises and blurs into focus a beat after the last — instead of the
// whole block fading in as one flat unit. Re-triggers every time it scrolls
// into view (once=false) rather than only the first time. Shared across the
// homepage and the destinations page so every "words" reveal on the site
// moves the same way.
export default function WordReveal({
  text,
  style,
  className,
  once = false,
  baseDelay = 0,
  wordDelay = 0.02,
}: {
  text: string;
  style?: CSSProperties;
  className?: string;
  once?: boolean;
  baseDelay?: number;
  wordDelay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.35 });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.25em', columnGap: '0.32em', ...style }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
            animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : { y: '100%', opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, delay: baseDelay + i * wordDelay, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}
