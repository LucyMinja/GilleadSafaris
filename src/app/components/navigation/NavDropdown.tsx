'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { NavLink } from './data';
import { navLabel, subLabel, chromeLink } from '../chromeType';

interface NavDropdownProps {
  link: NavLink;
  isActive: boolean;
  accent: string;
  linkColor: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
  hasBg: boolean;
}

export default function NavDropdown({
  link,
  isActive,
  accent,
  linkColor,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
  hasBg
}: NavDropdownProps) {
  const pathname = usePathname();
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentSearch(window.location.search);
    }
  }, [pathname]);

  const isSubLinkActive = (href: string) => {
    const p = pathname || '';
    const fullCurrentPath = p + currentSearch;
    if (href.includes('?')) {
      return fullCurrentPath === href || p === href.split('?')[0];
    }
    return p === href;
  };

    const containerVariants = {
    closed: {
      opacity: 0,
      y: 6,
      scale: 0.99,
      pointerEvents: 'none' as const,
      // Instant close: when you slide from one menu to the next, the old
      // panel must vanish at once rather than fade out (and wait for its
      // items to fade first via afterChildren) underneath the new one.
      transition: { duration: 0 }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: 'auto' as const,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], staggerChildren: 0.025, delayChildren: 0.01 }
    }
  };

  // Minimal panel: names only, one column. Descriptions stay in the data
  // (handy elsewhere) but made the menu read as a wall of text. The
  // "View all" link (the one without a description) is split off below a
  // hairline so it reads as the exit, not another item.
  const items = link.subLinks?.filter((sub) => sub.description) ?? [];
  const viewAll = link.subLinks?.find((sub) => !sub.description);
  const hairline = 'rgba(255,255,255,0.12)';
  const panelAccent = '#C9A97E'; // the panel is always dark, so always the light tan accent

  return (
    <div className="relative flex items-center h-full" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        type="button"
        className="relative flex items-center group bg-transparent border-none cursor-pointer outline-none h-full"
        style={{
          ...navLabel,
          fontWeight: isActive || isOpen ? 700 : 500,
          color: isActive || isOpen ? accent : linkColor,
          transition: 'color 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      >
        <span className="relative flex items-center gap-1">
          <span className="relative">
            {link.label}
            {isActive && (
              <span className="absolute -bottom-1.5 left-0 right-0" style={{ height: '2px', backgroundColor: accent }} />
            )}
          </span>
          <ChevronDown
            size={12}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: isOpen ? accent : 'inherit' }}
          />
        </span>
      </button>

      <motion.div
        variants={containerVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 origin-top"
        style={{ minWidth: '260px' }}
      >
        <div
          className="rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.14)] overflow-hidden border"
          style={{
            backgroundColor: 'var(--chrome)',
            borderColor: hairline,
          }}
        >
          <ul className="py-3 m-0 list-none">
            {items.map((sub) => {
              const activeSub = isSubLinkActive(sub.href);
              return (
                <motion.li key={sub.href} variants={{ closed: { opacity: 0, y: 4, transition: { duration: 0 } }, open: { opacity: 1, y: 0 } }}>
                  <Link
                    href={sub.href}
                    onClick={onClose}
                    className={`block px-6 py-2 whitespace-nowrap transition-colors duration-200 text-white hover:text-[#C9A97E]`}
                    style={{
                      ...chromeLink,
                      textDecoration: 'none',
                      fontWeight: activeSub ? 600 : 400,
                      color: activeSub ? panelAccent : undefined,
                    }}
                  >
                    {sub.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          {viewAll && (
            <Link
              href={viewAll.href}
              onClick={onClose}
              className="flex items-center justify-between gap-6 px-6 py-3.5 whitespace-nowrap transition-opacity duration-200 hover:opacity-70"
              style={{ borderTop: `1px solid ${hairline}`, textDecoration: 'none', ...subLabel, color: panelAccent }}
            >
              {viewAll.label}
              <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
