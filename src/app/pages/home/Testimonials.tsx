'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';
import { testimonials } from './data';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: '-40px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '24px' }}>Guest Experiences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-6"
        >
          <Quote size={28} strokeWidth={1.5} style={{ color: '#8D694B' }} />
        </motion.div>

        <div style={{ minHeight: '180px' }} className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(18px, 2.5vw, 28px)', color: '#6D6753', fontWeight: 400, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                "{testimonials[active].quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center justify-center" style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#F1EAE0', border: '1px solid rgba(109,103,83,0.15)', fontFamily: "'Newsreader', serif", fontSize: '12px', color: '#8D694B' }}>
                  {testimonials[active].name.charAt(0)}
                </div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(109,103,83,0.55)' }}>
                  {testimonials[active].name} · {testimonials[active].origin}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="transition-all duration-300"
              style={{ width: i === active ? '24px' : '6px', height: '2px', backgroundColor: i === active ? '#8D694B' : 'rgba(109,103,83,0.2)', borderRadius: '2px' }} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
