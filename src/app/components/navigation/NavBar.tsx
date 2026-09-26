'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { desktopLinks } from './data';
import NavDropdown from './NavDropdown';

export default function NavBar({
  hasBg,
  pathname,
  onMenuOpen,
}: {
  hasBg: boolean;
  pathname: string;
  onMenuOpen: () => void;
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const linkColor = hasBg ? 'rgba(241,234,224,0.82)' : 'rgba(255,255,255,0.90)';
  const linkHoverOut = hasBg ? 'rgba(241,234,224,0.82)' : 'rgba(255,255,255,0.90)';
  const accent = hasBg ? '#C9A97E' : '#8D694B';

  const handleClose = () => setActiveDropdown(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <AnimatePresence>
        {hasBg && (
          <motion.div
            key="nav-bg"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: '#6D6753', borderBottom: '1px solid rgba(241,234,224,0.12)', boxShadow: '0 6px 32px rgba(0,0,0,0.18)' }}
          />
        )}
      </AnimatePresence>

      <div className="relative max-w-[1400px] mx-auto grid items-center px-6 lg:px-16 h-[96px]" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <Link href="/" className="flex items-center group justify-self-start" style={{ textDecoration: 'none', gridColumn: 1 }}>
          <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(141,105,75,0.5)]" style={{ position: 'relative', width: '96px', height: '96px' }}>
            <Image
              src="/images/og2.png"
              alt="Gillead Safaris"
              width={72}
              height={72}
              className="object-contain absolute inset-0"
              style={{ width: '72px', height: '72px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-6 h-full" style={{ gridColumn: 2 }}>
          {desktopLinks.map((link) => {
            const isActive = pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname === sub.href));

            if (link.subLinks && link.subLinks.length > 0) {
              return (
                <NavDropdown
                  key={link.href}
                  link={link}
                  isActive={isActive}
                  accent={accent}
                  linkColor={linkColor}
                  isOpen={activeDropdown === link.label}
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClose={handleClose}
                  hasBg={hasBg}
                />
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative pb-1"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? accent : linkColor,
                  transition: 'color 0.2s ease',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = accent; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = linkHoverOut; }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0" style={{ height: '2px', backgroundColor: accent, opacity: 1 }} />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 justify-self-end" style={{ gridColumn: 3 }}>
          <Link
            href="/booking"
            className="hidden xl:inline-flex items-center gap-1.5 transition-colors duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: accent, whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.color = hasBg ? '#F1EAE0' : '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.color = accent; }}
          >
            Plan your safari <ArrowUpRight size={11} strokeWidth={1.5} />
          </Link>
          <button
            onClick={onMenuOpen}
            className="flex items-center gap-2 transition-colors"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: hasBg ? 'rgba(241,234,224,0.7)' : 'rgba(255,255,255,0.80)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; }}
            onMouseLeave={e => { e.currentTarget.style.color = hasBg ? 'rgba(241,234,224,0.7)' : 'rgba(255,255,255,0.75)'; }}
          >
            <div className="flex flex-col gap-1.5" style={{ width: '18px' }}>
              <span className="block h-px bg-current w-full" />
              <span className="block h-px bg-current" style={{ width: '75%' }} />
            </div>
            <span className="hidden xl:block">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
