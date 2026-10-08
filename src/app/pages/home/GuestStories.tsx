'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import GuestPhotos from './GuestPhotos';
import { testimonials, tripAdvisorUrl } from './data';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function GuestStories() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  const ref = useRef(null);
  const hasEntered = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="pt-10 pb-10 lg:pt-14 lg:pb-14">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-[1400px] mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-12 lg:items-center">

        {/* Text column — order-1 on mobile to ensure title/quote read first */}
        <div className="order-1 lg:order-2 lg:col-span-7 text-center lg:text-left">
          <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '28px' }}>
            What travelers say, verified on TripAdvisor
          </h2>

          <div style={{ minHeight: '200px' }}>
            {hasEntered && (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-5">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, rotate: -30, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: i * 0.06 }}
                    >
                      <Star size={13} fill="#8D694B" style={{ color: '#8D694B' }} />
                    </motion.span>
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
            )}
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:justify-between mt-10 gap-6">
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
        </div>

        {/* Image column — order-2 on mobile */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <GuestPhotos />
        </div>
      </motion.div>
    </section>
  );
}
