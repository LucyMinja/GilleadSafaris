'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import HeroVideo from '@/app/components/HeroVideo';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-15%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <HeroVideo />
      </div>

      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)' }} />

      {/* Reverted to your original Soft Beige bridge */}
      <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(241,234,224,0.35) 80%, #F1EAE0 100%)' }} />

      <motion.div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-[24vh]" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }}>
          <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(38px, 4.8vw, 64px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '0', color: '#ffffff', textShadow: '0 2px 16px rgba(0,0,0,0.4)', textWrap: 'balance' }}>
            Some journeys bring you<br />back to life.
          </h1>
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown size={18} style={{ color: 'rgba(255,255,255,0.35)' }} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
