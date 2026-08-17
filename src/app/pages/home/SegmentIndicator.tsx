'use client';

import { motion } from 'motion/react';

/* ── Segmented progress indicator — replaces plain dots ──────── */
export default function SegmentIndicator({
  total,
  active,
  paused,
  duration = 4.5,
  onGoTo,
  color = '#8D694B',
  trackColor = 'rgba(109,103,83,0.16)',
}: {
  total: number;
  active: number;
  paused: boolean;
  duration?: number;
  onGoTo: (i: number) => void;
  color?: string;
  trackColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 flex-1">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onGoTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="relative flex-1 overflow-hidden"
          style={{ height: '3px', borderRadius: '100px', backgroundColor: trackColor, border: 'none', padding: 0, cursor: 'pointer' }}
        >
          {i < active && (
            <span className="absolute inset-0" style={{ backgroundColor: color, borderRadius: '100px' }} />
          )}
          {i === active && (
            <motion.span
              key={paused ? `paused-${active}` : `playing-${active}`}
              className="absolute inset-y-0 left-0"
              style={{ backgroundColor: color, borderRadius: '100px' }}
              initial={{ width: '0%' }}
              animate={{ width: paused ? '0%' : '100%' }}
              transition={paused ? { duration: 0 } : { duration, ease: 'linear' }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
