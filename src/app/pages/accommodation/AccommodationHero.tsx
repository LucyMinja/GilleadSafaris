import { type RefObject } from 'react';
import { motion, type MotionValue } from 'motion/react';

export default function AccommodationHero({
  heroRef,
  bgY,
  textY,
  heroOpacity,
}: {
  heroRef: RefObject<HTMLElement | null>;
  bgY: MotionValue<string>;
  textY: MotionValue<string>;
  heroOpacity: MotionValue<number>;
}) {
  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1595652974621-4a7a0b2caa14?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)' }} />
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '22px' }}>Where You Sleep</p>
          <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(52px, 9vw, 100px)', fontWeight: 400, lineHeight: 1.0, color: '#ffffff', marginBottom: '24px' }}>
            Accommodation
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.9, color: 'rgba(255,255,255,0.68)', maxWidth: '520px', margin: '0 auto' }}>
            Every property handpicked. Every stay intentional. From baobab treehouses to oceanfront villas.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
