'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { NavLink } from './data';

interface NavDropdownProps {
  link: NavLink;
  isActive?: boolean;
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
  isActive = false,
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
    const fullCurrentPath = pathname + currentSearch;
    if (href.includes('?')) {
      return fullCurrentPath === href || pathname === href.split('?')[0];
    }
    return pathname === href;
  };

  const containerVariants = {
    closed: {
      opacity: 0,
      y: 6,
      scale: 0.99,
      pointerEvents: 'none' as const,
      transition: {
        duration: 0.2,
        ease: [0.32, 0, 0.67, 0],
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: 'auto' as const,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.09,
        delayChildren: 0.01
      }
    }
  };

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className="relative flex items-center group bg-transparent border-none cursor-pointer outline-none h-full"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: isActive || isOpen ? 700 : 500,
          color: isActive || isOpen ? accent : linkColor,
          transition: 'color 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      >
        <span className="relative flex items-center gap-1">
          <span>{link.label}</span>
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
        style={{ minWidth: '320px' }}
      >
        <div
          className="rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.18)] overflow-hidden border backdrop-blur-xl"
          style={{
            backgroundColor: hasBg ? 'rgba(78, 73, 58, 0.98)' : 'rgba(248, 244, 238, 0.98)',
            borderColor: hasBg ? 'rgba(241, 234, 224, 0.1)' : 'rgba(109, 103, 83, 0.1)',
          }}
        >
          <div className="py-4 px-2 flex flex-col gap-0.5">
            {link.subLinks?.map((sub, index) => {
              const activeSub = isSubLinkActive(sub.href);
              const itemVariants = {
                closed: { opacity: 0, y: index === 0 ? 0 : 12 },
                open: { opacity: 1, y: 0 }
              };

              return (
                <motion.div key={sub.href} variants={itemVariants}>
                  <Link
                    href={sub.href}
                    onClick={onClose}
                    className={`relative block px-4 py-3 rounded-xl transition-all duration-300 group/item overflow-hidden ${
                      hasBg ? 'hover:bg-white/[0.06] text-[#F1EAE0]' : 'hover:bg-black/[0.04] text-[#6D6753]'
                    }`}
                    style={{
                      textDecoration: 'none',
                      backgroundColor: activeSub ? (hasBg ? 'rgba(241,234,224,0.08)' : 'rgba(109,103,83,0.06)') : 'transparent'
                    }}
                  >
                    <div
                      className="text-[14px] font-semibold mb-0.5 tracking-wide transition-colors flex items-center"
                      style={{ color: activeSub ? accent : 'inherit' }}
                    >
                      {sub.label}
                    </div>
                    {sub.description && (
                      <div className="text-[11.5px] opacity-70">{sub.description}</div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
