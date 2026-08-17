import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="relative flex flex-col lg:flex-row-reverse" style={{ backgroundColor: '#faf7f4', minHeight: 'auto' }}>
      <motion.div
        className="relative w-full lg:w-[54%] min-h-[360px] lg:min-h-[720px] flex-shrink-0 overflow-hidden clip-diag-l"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/IMG_1068.jpg')", backgroundColor: '#c4a882', transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </motion.div>

      <motion.div
        className="flex-1 flex flex-col justify-center py-12 px-6 lg:py-20 lg:px-[6vw]"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ maxWidth: '460px', width: '100%' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>Who We Are</p>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 3.5vw, 50px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '28px', letterSpacing: '-0.01em' }}>
            Tanzania's wildlife,<br /><em style={{ color: '#8a694f' }}>your adventure</em>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.95, color: '#5a5047', marginBottom: '16px', fontWeight: 300 }}>
            Gillead Safaris is a safari and tour operation company based in Arusha, Tanzania - the gateway to Africa's greatest wildlife destinations. We were founded with a single belief: that extraordinary wildlife experiences should be accessible, honest, and deeply rooted in the communities they pass through.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.95, color: '#5a5047', marginBottom: '16px', fontWeight: 300 }}>
            Established in 2020, we have grown from a small team of two guides and a shared vehicle to a full-service operation with our own office in Arusha, a fleet of custom 4×4 safari vehicles, and a network of trusted lodge partners across Northern and Southern Tanzania.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.95, color: '#5a5047', marginBottom: '40px', fontWeight: 300 }}>
            Every itinerary we design is personal. We do not run group departures or cookie-cutter packages - we take the time to understand what you want from Tanzania and build a journey that reflects it.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/safaris" className="btn-primary">
              Our Safaris <ArrowUpRight size={11} strokeWidth={1.5} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
