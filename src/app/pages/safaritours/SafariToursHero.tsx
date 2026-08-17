import { type RefObject } from 'react';
import { motion, type MotionValue } from 'motion/react';

export default function SafariToursHero({
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
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f', y: bgY }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 100%)' }} />
      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: textY, opacity: heroOpacity }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Curated Experiences</p>
          <h1 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, lineHeight: 1.05, color: '#ffffff', marginBottom: '20px' }}>
            Safari Tours
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '560px', margin: '0 auto' }}>
            Ten handcrafted itineraries across Tanzania's parks, beaches and cultures - every safari is tailor-made and quoted to suit your budget.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
