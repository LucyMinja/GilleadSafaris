'use client';

import { AnimatePresence, motion } from 'motion/react';

/* ── Rolling-digit slide counter — pairs with SegmentIndicator ── */
export default function SlideCounter({
  active,
  total,
  color = '#6D6753',
}: {
  active: number;
  total: number;
  color?: string;
}) {
  return (
    <div
      className="flex items-center gap-1 flex-shrink-0"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', letterSpacing: '0.02em', color }}
    >
      <span className="relative inline-block overflow-hidden" style={{ height: '15px', width: '16px' }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={active}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ fontWeight: 600 }}
          >
            {String(active + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </span>
      <span style={{ opacity: 0.4 }}>/ {String(total).padStart(2, '0')}</span>
    </div>
  );
}
