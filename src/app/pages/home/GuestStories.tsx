'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import GuestPhotos from './GuestPhotos';
import { testimonials, tripAdvisorUrl } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Replaces the old FullBleed (generic unattributed quote) + Testimonials
// pair with one section — a magazine-style photo collage next to real,
// verifiable TripAdvisor reviews, with a direct link back to the source.
export default function GuestStories() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12 lg:items-center">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <GuestPhotos />
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '16px' }}>
            Guest Experiences
          </p>

          <div style={{ minHeight: '200px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star key={i} size={13} fill="#8D694B" style={{ color: '#8D694B' }} />
                  ))}
                </div>
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(19px, 2.3vw, 26px)', color: '#6D6753', fontWeight: 400, lineHeight: 1.6, marginBottom: '24px' }}>
                  "{t.quote}"
                </p>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', letterSpacing: '0.06em', color: 'rgba(109,103,83,0.65)' }}>
                  {t.name} · {t.trip} · {t.date}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-10 flex-wrap gap-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show review ${i + 1}`}
                  className="transition-all duration-300"
                  style={{ width: i === active ? '24px' : '6px', height: '2px', backgroundColor: i === active ? '#8D694B' : 'rgba(109,103,83,0.2)', borderRadius: '2px', border: 'none', cursor: 'pointer', padding: 0 }}
                />
              ))}
            </div>
            <a
              href={tripAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8D694B' }}
            >
              Read verified reviews on TripAdvisor <ArrowUpRight size={12} strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
