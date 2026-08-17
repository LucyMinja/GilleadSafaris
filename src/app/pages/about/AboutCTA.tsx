import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function AboutCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <motion.div
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&h=600&fit=crop&auto=format)' }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(138,105,79,0.8)' }} />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 text-center px-6">
        <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>
          Ready to explore Tanzania?
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', maxWidth: '460px', margin: '0 auto 40px' }}>
          Let us build your perfect safari. Our Arusha-based team is ready to design an itinerary around you.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/booking" className="btn-primary">
            Start Planning <ArrowUpRight size={13} strokeWidth={1.5} />
          </Link>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
