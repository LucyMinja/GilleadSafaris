'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

// Ties into real data (trip length) rather than being decorative for its
// own sake — fits SafarisGrid's "calm" identity better than a busier effect
// like a marquee would.
export default function CountUpDays({ text }: { text: string }) {
  const match = text.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : 0;
  const suffix = text.replace(/^\d+/, '');
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(p * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}
