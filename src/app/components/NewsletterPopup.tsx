'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import CollapsedTab from './newsletter/CollapsedTab';
import PopupHero from './newsletter/PopupHero';
import SuccessState from './newsletter/SuccessState';
import SubscribeForm from './newsletter/SubscribeForm';

const STORAGE_KEY = 'gillead_newsletter';
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    if (stored && stored !== 'subscribed' && stored !== 'permanent') {
      localStorage.setItem(STORAGE_KEY, 'permanent');
    } else {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
    setVisible(false);
  };

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
    return <CollapsedTab onExpand={() => setCollapsed(false)} />;
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
          <PopupHero onDismiss={dismiss} />

          <div style={{ backgroundColor: '#F1EAE0', padding: '24px' }}>
            {submitted ? (
              <SuccessState name={name} />
            ) : (
              <SubscribeForm
                name={name}
                email={email}
                onNameChange={setName}
                onEmailChange={setEmail}
                onSubmit={handleSubmit}
                onDismiss={dismiss}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
