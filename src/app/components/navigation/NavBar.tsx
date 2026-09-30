'use client';

// Build verification fix for Vercel deployment
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { desktopLinks, type NavLink } from './data';
import NavDropdown from './NavDropdown';
import { navLabel } from '../chromeType';

const CTA = '#E9A36B';

export default function NavBar({
  hasBg,
  pathname,
  onMenuOpen,
}: {
  hasBg: boolean;
  pathname: string | null;
  onMenuOpen: () => void;
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const linkColor = '#FFFFFF';
  const linkHoverOut = '#FFFFFF';
  const accent = '#C9A97E';

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
            style={{ backgroundColor: 'var(--chrome)', borderBottom: '1px solid rgba(241,234,224,0.12)', boxShadow: '0 6px 32px rgba(0,0,0,0.18)' }}
          />
        )}
      </AnimatePresence>

      <div className="relative max-w-[1400px] mx-auto grid items-center px-6 lg:px-16 h-[96px]" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
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

        {/* Middle column takes only the space left between logo and actions —
            with Trekking + Beach added, an equal-width '1fr auto 1fr' split
            let the links run into "Plan your safari" at laptop widths. */}
        <nav className="hidden xl:flex items-center justify-self-center gap-5 2xl:gap-6 h-full px-6" style={{ gridColumn: 2 }}>
          {desktopLinks.map((link: NavLink) => {
            const isActive = Boolean(pathname && (pathname === link.href || (link.subLinks?.some(sub => sub.href === pathname) ?? false)));

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
                className="relative flex items-center h-full"
                style={{
                  ...navLabel,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? accent : linkColor,
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = accent; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = linkHoverOut; }}
              >
                {/* Same full-height flex box as the dropdown buttons, so plain
                    links and dropdown triggers share one text baseline —
                    the old inline-block + pb-1 sat them ~2px higher. */}
                <span className="relative">
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0" style={{ height: '2px', backgroundColor: accent }} />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 justify-self-end" style={{ gridColumn: 3 }}>
          {/* Booking CTA as a plain word in its own colour — a warm sunset
              orange from the logo, so it's distinct from white links and the
              tan active-page colour. No arrow: booking stays on this site. */}
          <Link
            href="/booking"
            className="hidden xl:inline-flex items-center transition-colors duration-200"
            style={{ ...navLabel, fontWeight: 700, color: CTA, whiteSpace: 'nowrap', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.color = CTA; }}
          >
            Plan your safari
          </Link>
          <button
            onClick={onMenuOpen}
            className="flex items-center gap-2 transition-colors"
            style={{
              ...navLabel,
              color: '#FFFFFF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#FFFFFF'; }}
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
