'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';

export default function FullBleed() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} style={{ position: 'relative', height: '65vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div style={{ y, scale: 1.18, position: 'absolute', inset: 0 }}>
        <Image src="/images/956A3218.jpg" alt="Solitary acacia tree on the Serengeti plain" fill className="object-cover" unoptimized />
      </motion.div>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)' }} />
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '720px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(20px, 3.2vw, 36px)', color: '#ffffff', fontWeight: 400, lineHeight: 1.65, fontStyle: 'italic', marginBottom: '28px' }}>
            "Travel is never a matter of money, but of courage - take the leap."
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Gillead Safaris, Tanzania</p>
        </motion.div>
      </div>
    </section>
  );
}
