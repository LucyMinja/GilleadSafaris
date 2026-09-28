'use client';

import { motion } from 'motion/react';
import CoverImage from '@/app/components/CoverImage';

// Two offset, framed photos — a magazine-spread collage.
// Added organic floating animations so the photos drift slightly,
// creating a physical sense of depth and life.
export default function GuestPhotos() {
  return (
    <div className="relative" style={{ height: 'clamp(420px, 46vw, 560px)' }}>
      {/* Primary Photo — slow vertical drift */}
      <motion.div
        className="absolute overflow-hidden"
        style={{ top: 0, left: 0, width: '76%', height: '82%', borderRadius: '4px', boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <CoverImage src="/images/956A2097.webp" />
      </motion.div>

      {/* Secondary Photo — opposite drift with slight rotation for a physical "Polaroid" feel */}
      <motion.div
        className="absolute overflow-hidden"
        style={{ bottom: 0, right: 0, width: '54%', height: '50%', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.28)', border: '6px solid #F1EAE0' }}
        animate={{
          y: [0, 15, 0],
          rotate: [4, 2, 4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <CoverImage src="/images/nakupenda-beach.webp" />
      </motion.div>
    </div>
  );
}
