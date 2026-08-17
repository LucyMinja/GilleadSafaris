import { type RefObject } from 'react';
import { motion, type MotionValue } from 'motion/react';

export default function BookingHero({
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
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }} />
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Start Your Journey</p>
          <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
            Book a Safari
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '520px', margin: '0 auto' }}>
            Tell us where you want to go, when you'd like to travel, and we'll craft the perfect Tanzania safari for you.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
