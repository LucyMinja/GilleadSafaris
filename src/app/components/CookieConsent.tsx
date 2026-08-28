'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = 'gillead-cookie-consent';
export const REOPEN_EVENT = 'gillead:open-cookie-preferences';

type Consent = { analytics: boolean; decidedAt: string };

function applyConsent(analytics: boolean) {
  window.gtag?.('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
  });
}

function readStoredConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

// Google Consent Mode v2 gates GA's tracking cookies on this decision — see
// the inline script in app/layout.tsx for the default-denied state set
// before gtag.js loads. Declining here does NOT get silently overridden:
// GA gets only anonymous, cookieless pings (no _ga cookie, no cross-session
// tracking) until the visitor actively accepts. That's the compliant way to
// still get some aggregate signal without ignoring a real opt-out.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  // Once a choice exists (from storage, or made this session), the full
  // banner closes but a small floating icon stays put in the same corner —
  // consent can be withdrawn or changed at any time, so "closed" shouldn't
  // mean "gone without a trace," it should mean "tucked away but one tap
  // from reopening."
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      applyConsent(stored.analytics);
      setDecided(true);
    } else {
      setVisible(true);
    }

    const reopen = () => setVisible(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  function choose(analytics: boolean) {
    const consent: Consent = { analytics, decidedAt: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // localStorage unavailable (private browsing, etc.) — consent still
      // applies for this session, it just won't be remembered next visit.
    }
    applyConsent(analytics);
    setVisible(false);
    setDecided(true);
  }

  if (!visible) {
    if (!decided) return null;
    return (
      <button
        onClick={() => setVisible(true)}
        aria-label="Cookie preferences"
        className="fixed z-[100] bottom-6 left-6 flex items-center justify-center"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#6D6753',
          border: '1px solid rgba(241,234,224,0.15)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
          cursor: 'pointer',
        }}
      >
        <Cookie size={19} strokeWidth={1.5} color="#C9A97E" />
      </button>
    );
  }

  return (
    <div
      className="fixed z-[100] bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 sm:w-[360px]"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div
        style={{
          backgroundColor: '#6D6753',
          borderRadius: '12px',
          padding: '22px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          border: '1px solid rgba(241,234,224,0.12)',
        }}
      >
        <div className="flex items-start gap-3 mb-5">
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(141,105,75,0.3)' }}
          >
            <Cookie size={16} strokeWidth={1.5} color="#C9A97E" />
          </div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', lineHeight: 1.6, color: 'rgba(241,234,224,0.85)' }}>
            We use cookies to run this site and, with your permission, Google Analytics to understand how it's used.{' '}
            <Link href="/cookie-policy" style={{ color: '#C9A97E', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
              Read our Cookie Policy
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => choose(true)}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#ffffff',
              backgroundColor: '#8D694B',
              border: 'none',
              borderRadius: '6px',
              padding: '11px 16px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Accept All
          </button>
          <button
            onClick={() => choose(false)}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.06em',
              color: 'rgba(241,234,224,0.7)',
              background: 'none',
              border: '1px solid rgba(241,234,224,0.22)',
              borderRadius: '6px',
              padding: '10px 16px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Reject Non-Essential
          </button>
        </div>
      </div>
    </div>
  );
}
