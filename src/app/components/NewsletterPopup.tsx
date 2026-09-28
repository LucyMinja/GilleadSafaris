'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ArrowRight } from 'lucide-react';
import SafariButton from './SafariButton';

export default function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('gillead:newsletter_dismissed');
      if (!dismissed) setShow(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('gillead:newsletter_dismissed', 'true');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(dismiss, 3000);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden"
            style={{
              backgroundColor: '#F1EAE0',
              borderRadius: '12px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
              border: '1px solid rgba(109,103,83,0.1)'
            }}
          >
            {/* High-end "Invitation" Header */}
            <div className="h-2 w-full" style={{ backgroundColor: '#8D694B' }} />

            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-[#6D6753]/40 hover:text-[#8D694B] transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="p-10 lg:p-14 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-8" style={{ backgroundColor: 'rgba(141,105,75,0.1)' }}>
                <Mail size={20} color="#8D694B" strokeWidth={1.5} />
              </div>

              <AnimatePresence mode="wait">
                {!subscribed ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 style={{ fontFamily: "'Newsreader', serif", fontSize: '32px', fontWeight: 500, color: '#6D6753', marginBottom: '16px', lineHeight: 1.2 }}>
                      The Spirit of Tanzania,<br />delivered to you.
                    </h2>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.8, lineHeight: 1.7, marginBottom: '32px' }}>
                      Join our inner circle for seasonal wildlife updates, new luxury lodge openings, and curated safari inspiration.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 outline-none transition-all duration-300"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '14px',
                          backgroundColor: '#ffffff',
                          border: '1px solid rgba(109,103,83,0.15)',
                          borderRadius: '4px',
                          color: '#6D6753'
                        }}
                      />
                      <SafariButton type="submit" className="w-full">
                        Subscribe <ArrowRight size={14} className="ml-1" />
                      </SafariButton>
                    </form>
                    <p className="mt-4" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6D6753', opacity: 0.4 }}>
                      Zero spam. Unsubscribe anytime.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6"
                  >
                    <div className="text-4xl mb-6">🐘</div>
                    <h3 style={{ fontFamily: "'Newsreader', serif", fontSize: '28px', color: '#6D6753', marginBottom: '12px' }}>Karibu sana!</h3>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', color: '#6D6753', opacity: 0.8 }}>
                      Thank you for joining us. We look forward to sharing our world with you.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
