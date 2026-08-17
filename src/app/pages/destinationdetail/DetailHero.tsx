import { type RefObject } from 'react';
import { motion, type MotionValue } from 'motion/react';

export default function DetailHero({
  dest,
  heroRef,
  bgY,
  textY,
  heroOpacity,
}: {
  dest: { heroImg: string; region: string; name: string; tagline: string };
  heroRef: RefObject<HTMLElement | null>;
  bgY: MotionValue<string>;
  textY: MotionValue<string>;
  heroOpacity: MotionValue<number>;
}) {
  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${dest.heroImg})`, backgroundColor: '#8a694f', y: bgY }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.65) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)' }} />
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: '28px', height: '1px', backgroundColor: '#d3ba8b' }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d3ba8b' }}>{dest.region}</span>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#d3ba8b' }} />
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(42px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px', textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}>
            {dest.name}
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', maxWidth: '540px', margin: '0 auto', fontStyle: 'italic', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}>
            {dest.tagline}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
