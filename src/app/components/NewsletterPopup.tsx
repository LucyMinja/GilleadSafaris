'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'gillead_newsletter';
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    // Never show again if subscribed or permanently dismissed
    if (stored === 'subscribed' || stored === 'permanent') return;

    // If dismissed once, only show again after 3 days
    if (stored) {
      const elapsed = Date.now() - Number(stored);
      if (elapsed < THREE_DAYS_MS) return;
    }

    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);

  // Left untouched, the full card would sit over page content indefinitely — shrink it
  // to a small tab after a while so it stops blocking whatever's underneath.
  useEffect(() => {
    if (!visible || submitted) return;
    const t = setTimeout(() => setCollapsed(true), 9000);
    return () => clearTimeout(t);
  }, [visible, submitted]);

  const dismiss = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Second dismissal → never show again
    if (stored && stored !== 'subscribed' && stored !== 'permanent') {
      localStorage.setItem(STORAGE_KEY, 'permanent');
    } else {
      // First dismissal → store timestamp, re-prompt after 3 days
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
    setVisible(false);
  };

  const cardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, 'subscribed');

    const rect = cardRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + 40) / window.innerHeight }
      : { x: 0.85, y: 0.7 };
    confetti({
      particleCount: 90,
      spread: 75,
      startVelocity: 32,
      gravity: 1.1,
      origin,
      colors: ['#8D694B', '#8D694B', '#8D694B', '#F1EAE0'],
      zIndex: 300,
    });

    setTimeout(() => setVisible(false), 3800);
  };

  if (visible && collapsed) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.7, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        onClick={() => setCollapsed(false)}
        className="fixed z-[200] flex items-center gap-2"
        style={{
          bottom: '20px',
          right: '20px',
          padding: '12px 18px',
          borderRadius: '100px',
          backgroundColor: '#8D694B',
          color: '#F1EAE0',
          border: '1px solid rgba(141,105,75,0.4)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          cursor: 'pointer',
        }}
      >
        <Sparkles size={13} strokeWidth={2} />
        <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Join our list
        </span>
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {visible && !collapsed && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 24, scale: 0.94, rotate: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.9 }}
          className="fixed z-[200] overflow-hidden w-[calc(100vw-32px)] max-w-[360px] bottom-4 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0 sm:w-[360px]"
          style={{
            borderRadius: '20px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)',
            border: '1px solid rgba(141,105,75,0.25)',
          }}
        >
          {/* Hero image — tall & dramatic */}
          <div className="relative overflow-hidden" style={{ height: '220px' }}>
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=500&fit=crop&auto=format')" }}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.08) 0%, rgba(20,10,4,0.82) 100%)' }} />

            {/* Gold top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{ height: '3px', background: 'linear-gradient(90deg, #8D694B, #8D694B, #8D694B)', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Close */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 400, damping: 18 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={dismiss}
              className="absolute top-4 right-4 flex items-center justify-center"
              style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'background-color 0.2s, transform 0.25s' }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)')}
            >
              <X size={13} strokeWidth={2.5} />
            </motion.button>

            {/* Text over image */}
            <div className="absolute bottom-5 left-6 right-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '8px' }}
              >
                Gillead Safaris · Tanzania
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontFamily: "'Newsreader', serif", fontSize: '26px', color: '#ffffff', lineHeight: 1.15, fontWeight: 600, margin: 0 }}
              >
                The wild is waiting.<br />
                Are you ready?
              </motion.h3>
            </div>
          </div>

          {/* Form section */}
          <div style={{ backgroundColor: '#F1EAE0', padding: '24px' }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <motion.p
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.1 }}
                  style={{ fontSize: '32px', marginBottom: '10px' }}
                >
                  🌿
                </motion.p>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', color: '#6D6753', marginBottom: '6px' }}>
                  Welcome, {name}.
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(109,103,83,0.55)', lineHeight: 1.7 }}>
                  Safari stories are on their way to your inbox.
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-1"
                  style={{ marginTop: '10px', color: '#8D694B' }}
                >
                  <Sparkles size={12} strokeWidth={2} />
                  <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Karibu Tanzania</span>
                  <Sparkles size={12} strokeWidth={2} />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
              >
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                  style={{ fontSize: '12px', color: 'rgba(109,103,83,0.6)', lineHeight: 1.7, marginBottom: '18px' }}
                >
                  Wildlife dispatches, exclusive offers &amp; trip guides — straight to your inbox. No spam, ever.
                </motion.p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid rgba(141,105,75,0.2)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        fontSize: '13px',
                        color: '#6D6753',
                        outline: 'none',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#8D694B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(141,105,75,0.1)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(141,105,75,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }} style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        border: '1.5px solid rgba(141,105,75,0.2)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        fontSize: '13px',
                        color: '#6D6753',
                        outline: 'none',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#8D694B'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(141,105,75,0.1)'; }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(141,105,75,0.2)'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </motion.div>
                  <motion.button
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(141,105,75,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full"
                    style={{
                      marginTop: '2px',
                      backgroundColor: '#8D694B',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '13px 20px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      cursor: 'pointer',
                    }}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = '#6D5540')}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = '#8D694B')}
                  >
                    Subscribe <ArrowRight size={13} strokeWidth={2} />
                  </motion.button>
                </form>

                <motion.button
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  onClick={dismiss}
                  style={{ marginTop: '12px', fontSize: '11px', color: 'rgba(109,103,83,0.35)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 0.2s', display: 'block', width: '100%', textAlign: 'center' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#8D694B')}
                  onMouseOut={e => (e.currentTarget.style.color = 'rgba(109,103,83,0.35)')}
                >
                  No thanks, I'll miss out
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
