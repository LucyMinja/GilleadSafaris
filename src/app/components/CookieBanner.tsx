'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';

const COOKIE_KEY = 'gillead_cookies_consent';
const COOKIE_TS  = 'gillead_cookies_ts';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export default function CookieBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ts = localStorage.getItem(COOKIE_TS);
    const expired = !ts || Date.now() - Number(ts) > ONE_DAY_MS;
    if (!expired) return;
    const t = setTimeout(() => setModalOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const save = (choice: string) => {
    localStorage.setItem(COOKIE_KEY, choice);
    localStorage.setItem(COOKIE_TS, String(Date.now()));
    setModalOpen(false);
  };

  const accept = () => save('accepted');
  const decline = () => save('declined');

  return (
    <>
      {/* Center modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[210] bg-black/40 backdrop-blur-sm"
            />

            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24, mass: 0.8 }}
              className="fixed inset-0 z-[220] flex items-center justify-center px-4 pointer-events-none"
            >
              <div
                className="pointer-events-auto w-full max-w-[460px] overflow-hidden"
                style={{
                  backgroundColor: '#f0e8dc',
                  borderRadius: '20px',
                  border: '1px solid rgba(138,105,79,0.22)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.1)',
                }}
              >
                {/* Gold accent top */}
                <motion.div
                  style={{ height: '3px', background: 'linear-gradient(90deg, #8a694f, #DF9307, #d3ba8b)', transformOrigin: 'left' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                />

                <div style={{ padding: '32px 32px 28px', position: 'relative' }}>
                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 18 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={decline}
                    style={{ position: 'absolute', top: '16px', right: '16px', width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'rgba(138,105,79,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(44,24,16,0.5)', transition: 'background-color 0.2s, color 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(138,105,79,0.2)'; e.currentTarget.style.color = '#2C1810'; }}
                    onMouseOut={e => { e.currentTarget.style.backgroundColor = 'rgba(138,105,79,0.1)'; e.currentTarget.style.color = 'rgba(44,24,16,0.5)'; }}
                  >
                    <X size={14} strokeWidth={2.5} />
                  </motion.button>

                  {/* Icon + title */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, -12, 10, -6, 0] }}
                      transition={{ delay: 0.5, duration: 0.7, ease: 'easeInOut' }}
                      style={{ fontSize: '28px', lineHeight: 1, display: 'inline-block' }}
                    >
                      🍪
                    </motion.span>
                    <div>
                      <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#2C1810', margin: 0, lineHeight: 1.2 }}>
                        Your privacy matters
                      </p>
                      <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8a694f', marginTop: '3px' }}>
                        Cookie preferences
                      </p>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4 }}
                    style={{ fontSize: '13px', color: 'rgba(44,24,16,0.65)', lineHeight: 1.8, marginBottom: '10px', fontFamily: "'Lato', sans-serif" }}
                  >
                    We use essential cookies to keep the site running and optional analytics cookies to understand how you explore our safaris — so we can make your planning experience better.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.4 }}
                    style={{ fontSize: '12px', color: 'rgba(44,24,16,0.45)', lineHeight: 1.7, marginBottom: '26px', fontFamily: "'Lato', sans-serif" }}
                  >
                    You can change your preferences at any time using the cookie icon on the left of your screen.{' '}
                    <Link href="/privacy" style={{ color: '#8a694f', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                      Privacy Policy
                    </Link>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: '0 8px 20px rgba(138,105,79,0.35)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={accept}
                      style={{
                        flex: 1,
                        backgroundColor: '#8a694f',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '13px 0',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontFamily: "'Lato', sans-serif",
                        cursor: 'pointer',
                      }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = '#7a5c42')}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = '#8a694f')}
                    >
                      Accept all
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={decline}
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        color: 'rgba(44,24,16,0.6)',
                        border: '1.5px solid rgba(138,105,79,0.3)',
                        borderRadius: '10px',
                        padding: '13px 0',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontFamily: "'Lato', sans-serif",
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, color 0.2s',
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = '#8a694f'; e.currentTarget.style.color = '#8a694f'; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(138,105,79,0.3)'; e.currentTarget.style.color = 'rgba(44,24,16,0.6)'; }}
                    >
                      Essential only
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sticky cookie icon — always visible */}
      {!modalOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26, delay: 0.6 }}
          style={{ position: 'fixed', left: '16px', bottom: '80px', zIndex: 180, width: '42px', height: '42px' }}
        >
          {/* Idle pulse ring */}
          <motion.span
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.9 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1.4 }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid #8a694f', pointerEvents: 'none' }}
          />
          <motion.button
            whileHover={{ scale: 1.12, rotate: 18 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setModalOpen(true)}
            title="Cookie preferences"
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#f0e8dc',
              border: '1.5px solid rgba(138,105,79,0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8a694f',
              cursor: 'pointer',
              transition: 'box-shadow 0.25s, border-color 0.25s, background-color 0.25s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.boxShadow = '0 6px 22px rgba(138,105,79,0.3)';
              e.currentTarget.style.borderColor = '#8a694f';
              e.currentTarget.style.backgroundColor = '#e8ddd0';
            }}
            onMouseOut={e => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
              e.currentTarget.style.borderColor = 'rgba(138,105,79,0.3)';
              e.currentTarget.style.backgroundColor = '#f0e8dc';
            }}
          >
            <Cookie size={18} strokeWidth={1.5} />
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
