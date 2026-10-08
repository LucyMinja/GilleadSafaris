'use client';

import { usePathname } from 'next/navigation';

// Floating WhatsApp chat button, bottom-right on every page. Opens a chat with
// the Arusha office (+255 753 959 375) and pre-fills which page the visitor
// was on. Boxed corners like every other button on the site.
const PHONE = '255753959375'; // international format, no "+" or spaces (wa.me requires this)

export default function WhatsAppButton() {
  const pathname = usePathname() ?? '/';
  const text = encodeURIComponent(`Hi Gillead Safaris, I'd like to ask about a trip. (I was looking at gilleadsafaris.com${pathname === '/' ? '' : pathname})`);
  // The booking page has its own sticky Continue bar on phones — sit above it.
  const raised = pathname.startsWith('/booking');

  return (
    <a
      href={`https://wa.me/${PHONE}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`wa-btn fixed z-[60] right-4 sm:right-6 ${raised ? 'bottom-24 lg:bottom-6' : 'bottom-4 sm:bottom-6'} flex items-center gap-2 px-3.5 py-3 sm:px-4 text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-transform hover:-translate-y-0.5`}
      style={{ backgroundColor: '#25D366', borderRadius: '2px', textDecoration: 'none' }}
    >
      <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.65c-2 0-3.95-.54-5.66-1.55l-.4-.24-3.97 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64S26.66 10.13 26.66 16s-4.76 10.65-10.62 10.65Zm5.83-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.6 9.6 0 0 1-1.78-2.21c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.2 2 .12.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
      </svg>
      <span className="hidden sm:inline" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em' }}>
        WhatsApp us
      </span>
    </a>
  );
}
