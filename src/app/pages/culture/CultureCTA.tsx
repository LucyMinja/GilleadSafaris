import { motion } from 'motion/react';
import SafariButton from '@/app/components/SafariButton';

export default function CultureCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1623743423143-23df3234ae5c?w=1920&h=600&fit=crop&auto=format)' }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(138,105,79,0.75)' }} />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 text-center px-6">
        <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: '#ffffff', marginBottom: '16px' }}>
          Experience Culture First-Hand
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 40px' }}>
          Our cultural add-ons can be woven into any safari itinerary. Ask us about Maasai village visits, Hadzabe hunting experiences, and Zanzibar spice tours.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <SafariButton href="/booking">
            Build Your Safari
          </SafariButton>
          <SafariButton href="/contact" variant="secondary">
            Ask a Question
          </SafariButton>
        </div>
      </motion.div>
    </section>
  );
}
