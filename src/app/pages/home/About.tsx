'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="relative" style={{ backgroundColor: '#F1EAE0', overflow: 'hidden' }}>
      {/* Asymmetric composition — image sits left, text sits right; headline lives
          inside the text column (not spanning full width) so it reads as one
          composed block instead of a banner sitting over the page */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-20 pb-20 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 lg:items-center">
        {/* Image column — left, wider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="relative" style={{ width: '88%' }}>
            <div className="group relative overflow-hidden" style={{ height: 'clamp(400px, 38vw, 520px)', borderRadius: '4px' }}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]"
                style={{
                  backgroundImage: "url('/images/956A2613.jpg')",
                  backgroundColor: '#8D694B',
                }}
              />
              <div className="absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity duration-700" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />
              <div className="absolute bottom-8 left-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-100">
                <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(14px, 1.6vw, 18px)', fontStyle: 'italic', color: '#ffffff', lineHeight: 1.6, maxWidth: '280px' }}>
                  "Every sunrise here tells a different story - we just help you find yours."
                </p>
              </div>
            </div>

            {/* Floating guide photo — breaks out of the image box's bottom-right corner,
                tilted slightly like a kept Polaroid, leaning toward the text column */}
            <div
              className="absolute hidden md:block"
              style={{ width: '38%', bottom: '-56px', right: '-24px', transform: 'rotate(4deg)' }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', borderRadius: '6px', border: '6px solid #F1EAE0', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
                <Image src="/images/team/nic.png" alt="Nicanory, our reservation manager in Arusha" fill className="object-cover" unoptimized />
              </div>
              <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '13px', color: '#8D694B', textAlign: 'center', marginTop: '10px' }}>
                Nicanory, our team in Arusha
              </p>
            </div>
          </div>
        </motion.div>

        {/* Text column — right, narrower */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="lg:col-span-5"
          style={{ marginTop: 'clamp(20px, 3vw, 36px)' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: 'clamp(30px, 3.6vw, 46px)',
              fontWeight: 600,
              color: '#6D6753',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            We grew up here.
          </motion.h2>

          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '18px', fontWeight: 400 }}>
            Gillead Safaris began with a simple belief: that the people who grew up watching the sun rise over the Serengeti are the ones best placed to share it with you.
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '18px', fontWeight: 400 }}>
            We're a team of Arusha locals — guides, drivers, and planners — who have spent our lives among these plains, turning bucket-list dreams into real memories since 2020.
          </p>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', marginBottom: '40px', fontWeight: 400 }}>
            Every itinerary starts with a conversation, not a template — where you want to go, how long you have, what you're hoping to see. We build the rest around that.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
