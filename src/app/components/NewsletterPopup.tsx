'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import SafariButton from './SafariButton';
import CoverImage from './CoverImage';
import { chromeLink, chromeSmall, subLabel } from './chromeType';

const DISMISSED_KEY = 'gillead:newsletter_dismissed';
const COOKIE_KEY = 'gillead-cookie-consent';

// A small corner card, not a page-blocking modal. It waits until someone is
// actually reading (half a page scrolled), never stacks on top of the cookie
// banner, and stays off the booking flow entirely.
export default function NewsletterPopup() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/booking')) return;
    const read = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
    if (read(DISMISSED_KEY)) return;

    const onScroll = () => {
      const scrolled = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (scrolled > 0.5 && read(COOKIE_KEY)) {
        setShow(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const dismiss = () => {
    setShow(false);
    try { localStorage.setItem(DISMISSED_KEY, 'true'); } catch {}
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email) return;
    setSubscribed(true);
    setTimeout(dismiss, 3500);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        />
        <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter sign-up"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[640px] flex overflow-hidden"
          style={{ backgroundColor: 'var(--chrome)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}
        >
          <div className="relative hidden sm:block flex-shrink-0" style={{ width: '220px' }}>
            <CoverImage sizes="220px" src="/images/956A2350.webp" alt="Serengeti plains at first light" />
          </div>

          <div className="relative flex-1 min-w-0 p-6 sm:p-8">
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            {!subscribed ? (
              <>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '21px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '8px', paddingRight: '20px' }}>
                  Safari stories, straight from Tanzania
                </p>
                <p style={{ ...chromeLink, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Where the herds are this season, new trips and the occasional offer.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    aria-label="Name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-3 outline-none focus:border-[#C9A97E]"
                    style={{ ...chromeLink, color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px' }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    aria-label="Email address"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 outline-none focus:border-[#C9A97E]"
                    style={{ ...chromeLink, color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px' }}
                  />
                  <SafariButton type="submit" size="sm" style={{ width: '100%', padding: '13px 20px' }}>Subscribe</SafariButton>
                </form>
              </>
            ) : (
              <div className="py-2">
                <p style={{ ...subLabel, color: '#C9A97E', marginBottom: '8px' }}>Asante</p>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '21px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '6px' }}>
                  {name.trim().split(' ')[0] ? `You're on the list, ${name.trim().split(' ')[0]}.` : 'You\'re on the list.'}
                </p>
                <p style={{ ...chromeLink, color: 'rgba(255,255,255,0.8)' }}>
                  The next letter goes out at the start of the season.
                </p>
              </div>
            )}
          </div>
        </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
