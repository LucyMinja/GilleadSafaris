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
    if (!email) return;
    setSubscribed(true);
    setTimeout(dismiss, 3500);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          role="dialog"
          aria-label="Newsletter sign-up"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[55] bottom-20 left-3 right-3 sm:left-auto sm:bottom-24 sm:right-6 sm:w-[460px] flex overflow-hidden"
          style={{ backgroundColor: 'var(--chrome)', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}
        >
          <div className="relative hidden sm:block flex-shrink-0" style={{ width: '120px' }}>
            <CoverImage sizes="120px" src="/images/956A2350.webp" alt="Serengeti plains at first light" />
          </div>

          <div className="relative flex-1 min-w-0 p-5 sm:p-6">
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
                  A short letter from Arusha, once a season
                </p>
                <p style={{ ...chromeLink, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Where the herds are, which parks are quiet, and a few photos from our guides. Nothing else.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-0 px-3 outline-none focus:border-[#C9A97E]"
                    style={{ ...chromeLink, color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px' }}
                  />
                  <SafariButton type="submit" size="sm">Subscribe</SafariButton>
                </form>
                <button
                  onClick={dismiss}
                  className="mt-3 text-white/60 hover:text-white transition-colors"
                  style={{ ...chromeSmall, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  No thanks
                </button>
              </>
            ) : (
              <div className="py-2">
                <p style={{ ...subLabel, color: '#C9A97E', marginBottom: '8px' }}>Asante</p>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '21px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '6px' }}>
                  You&rsquo;re on the list.
                </p>
                <p style={{ ...chromeLink, color: 'rgba(255,255,255,0.8)' }}>
                  The next letter goes out at the start of the season.
                </p>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
