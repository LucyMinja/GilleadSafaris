'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';

const menuLinks = [
  {
    label: 'Destinations',
    href: '/destinations',
    desktopNav: true,
    sub: ['Serengeti', 'Ngorongoro', 'Zanzibar', 'Kilimanjaro', 'Tarangire', 'Lake Manyara'],
  },
  {
    label: 'Safaris',
    href: '/safaris',
    desktopNav: true,
    sub: ['Classic Safari', 'Luxury Safari', 'Family Safari', 'Walking Safari', 'Photography Safari'],
  },
  { label: 'Accommodation', href: '/accommodation', desktopNav: true, sub: ['Luxury Lodges', 'Tented Camps', 'Beach Resorts'] },
  { label: 'About', href: '/about', desktopNav: true, sub: [] },
  { label: 'Gallery', href: '/gallery', desktopNav: true, sub: [] },
  { label: 'Culture & Heritage', href: '/culture', desktopNav: false, sub: ['Maasai People', 'Zanzibar Heritage', 'Hadzabe Tribe', 'What to Pack'] },
  { label: 'Book a Safari', href: '/booking', desktopNav: false, sub: [] },
  { label: 'Contact', href: '/contact', desktopNav: false, sub: [] },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setScrolled(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const hasBg = scrolled;
  const linkColor = hasBg ? 'rgba(241,234,224,0.82)' : 'rgba(255,255,255,0.90)';
  const linkHoverOut = hasBg ? 'rgba(241,234,224,0.82)' : 'rgba(255,255,255,0.90)';
  const accent = hasBg ? '#C9A97E' : '#8D694B';

  return (
    <>
      {/* Main nav bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Animated background panel — slides down from above */}
        <AnimatePresence>
          {hasBg && (
            <motion.div
              key="nav-bg"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: '#6D6753',
                borderBottom: '1px solid rgba(241,234,224,0.12)',
                boxShadow: '0 6px 32px rgba(0,0,0,0.18)',
              }}
            />
          )}
        </AnimatePresence>
        {/* 3-column grid: logo | nav | actions */}
        <div className="relative grid items-center px-6 lg:px-20 h-[96px]" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

          {/* Left — Logo */}
          <Link href="/" className="flex items-center group justify-self-start ml-24" style={{ textDecoration: 'none' }}>
            <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(141,105,75,0.5)]" style={{ position: 'relative', width: '96px', height: '96px' }}>
              <Image
                src="/images/og2.png"
                alt="Gillead Safaris"
                width={72}
                height={72}
                className="object-contain absolute inset-0"
                style={{ opacity: hasBg ? 0 : 1, transition: 'opacity 0.3s ease', width: '72px', height: '72px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
              <Image
                src="/logo.gif"
                alt="Gillead Safaris"
                width={96}
                height={96}
                className="object-contain absolute inset-0"
                style={{ opacity: hasBg ? 1 : 0, transition: 'opacity 0.3s ease', width: '96px', height: '96px' }}
              />
            </div>
          </Link>

          {/* Centre — Nav links (desktop only) */}
          <nav className="hidden lg:flex items-center gap-7">
            {[
              { label: 'Destinations', href: '/destinations' },
              { label: 'Safaris', href: '/safaris' },
              { label: 'Accommodation', href: '/accommodation' },
              { label: 'About', href: '/about' },
              { label: 'Gallery', href: '/gallery' },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative pb-1"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '13px',
                    letterSpacing: '0.12em',
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

          {/* Right — Plan safari + Menu */}
          <div className="flex items-center gap-5 justify-self-end mr-24">
            <Link
              href="/booking"
              className="hidden lg:inline-flex items-center gap-1.5 transition-colors duration-200"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: accent,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = hasBg ? '#F1EAE0' : '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = accent; }}
            >
              Plan your safari <ArrowUpRight size={11} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
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
              <span className="hidden lg:block">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-lg flex flex-col"
              style={{
                backgroundColor: '#6D6753',
                // backdropFilter: 'blur(28px) saturate(160%)',
                // WebkitBackdropFilter: 'blur(28px) saturate(160%)',
                borderLeft: '1px solid rgba(241,234,224,0.15)',
              }}
            >
              {/* Close header */}
              <div className="flex items-center justify-between px-10 py-8" style={{ borderBottom: '1px solid rgba(241,234,224,0.15)' }}>
                <Link
                  href="/"
                  style={{ fontFamily: "'Newsreader', serif", fontSize: '15px', color: 'rgba(241,234,224,0.75)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C9A97E'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(241,234,224,0.75)'; }}
                  onClick={() => setMenuOpen(false)}
                >
                  Gillead Safaris
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{ color: 'rgba(241,234,224,0.6)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#C9A97E'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(241,234,224,0.6)'; }}
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-10 py-10">
                {menuLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className={`py-5${link.desktopNav ? ' lg:hidden' : ''}`}
                      style={{ borderBottom: '1px solid rgba(241,234,224,0.15)' }}
                    >
                      <Link
                        href={link.href}
                        className="block"
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={e => (e.currentTarget.querySelector('span')!.style.color = '#C9A97E')}
                        onMouseLeave={e => (e.currentTarget.querySelector('span')!.style.color = isActive ? '#C9A97E' : 'rgba(241,234,224,0.85)')}
                      >
                        <span
                          style={{
                            fontFamily: "'Newsreader', serif",
                            fontSize: 'clamp(22px, 4vw, 32px)',
                            fontWeight: 600,
                            color: isActive ? '#C9A97E' : 'rgba(241,234,224,0.85)',
                            letterSpacing: '-0.01em',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {link.label}
                        </span>
                      </Link>
                      {link.sub.length > 0 && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                          {link.sub.map((s) => (
                            <span key={s} style={{ fontSize: '11px', color: 'rgba(241,234,224,0.45)', letterSpacing: '0.06em' }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-10 py-8" style={{ borderTop: '1px solid rgba(241,234,224,0.15)' }}>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2"
                  style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A97E', fontWeight: 500 }}
                  onClick={() => setMenuOpen(false)}
                >
                  Plan your safari <ArrowUpRight size={11} strokeWidth={1.5} />
                </Link>
                <p style={{ fontSize: '11px', color: 'rgba(241,234,224,0.45)', marginTop: '12px', letterSpacing: '0.04em' }}>
                  info@gillieadsafaris.com · +255 753 959 375
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
