'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';
import SafariButton from './SafariButton';
import { chromeLink } from './chromeType';

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
    // Small square tab to reopen preferences — boxed like the site's buttons.
    return (
      <button
        onClick={() => setVisible(true)}
        aria-label="Cookie preferences"
        // Hidden on phones, where it would sit on top of other bottom-corner UI;
        // the Cookie Policy page has its own "change preferences" button.
        className="fixed z-[100] bottom-6 left-6 hidden sm:flex items-center justify-center"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '2px',
          backgroundColor: 'var(--chrome)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
          cursor: 'pointer',
        }}
      >
        <Cookie size={17} strokeWidth={1.5} color="#C9A97E" />
      </button>
    );
  }

  // Same chrome colour, type and boxed buttons as the navbar/footer. On phones
  // it's a slim strip with the two buttons side by side, so it covers far
  // less of the hero than the old stacked card.
  return (
    <div
      className="fixed z-[100] bottom-3 left-3 right-3 sm:right-auto sm:bottom-6 sm:left-6 sm:w-[380px]"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div
        className="p-4 sm:p-6"
        style={{
          backgroundColor: 'var(--chrome)',
          borderRadius: '2px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <p className="mb-4" style={{ ...chromeLink, color: '#FFFFFF', lineHeight: 1.6 }}>
          We use cookies to run this site and, with your permission, Google Analytics to understand how it’s used.{' '}
          <Link href="/cookie-policy" style={{ color: '#C9A97E', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            Cookie Policy
          </Link>
        </p>
        <div className="grid grid-cols-2 gap-2">
          <SafariButton size="sm" onClick={() => choose(true)} style={{ width: '100%', padding: '10px 12px' }}>
            Accept all
          </SafariButton>
          <SafariButton size="sm" variant="light" onClick={() => choose(false)} style={{ width: '100%', padding: '10px 12px' }}>
            Essential only
          </SafariButton>
        </div>
      </div>
    </div>
  );
}
