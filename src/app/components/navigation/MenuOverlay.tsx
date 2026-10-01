import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { menuLinks, type NavLink } from './data';
import { socials } from '../footer/data';
import { offices } from '@/app/pages/contact/data';
import CoverImage from '../CoverImage';
import { subLabel, chromeLink, chromeSmall } from '../chromeType';

const office = offices[0];

export default function MenuOverlay({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string | null;
  onClose: () => void;
}) {
  const [expandedLinks, setExpandedLinks] = useState<Record<string, boolean>>({});

  const toggleExpand = (label: string) => {
    setExpandedLinks(prev => ({ ...prev, [label]: !prev[label] }));
  };

  // Mouse users get the sub-list on hover; touch devices (no hover) keep
  // tap-the-chevron, since a hover there would fire on the same tap as the link.
  const setExpandOnHover = (label: string, open: boolean) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setExpandedLinks(prev => ({ ...prev, [label]: open }));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-lg flex flex-col"
            style={{ backgroundColor: 'var(--chrome)', borderLeft: '1px solid rgba(241,234,224,0.15)' }}
          >
            <div className="flex items-center justify-between px-10 py-8" style={{ borderBottom: '1px solid rgba(241,234,224,0.15)' }}>
              <Link
                href="/"
                style={{ fontFamily: "'Newsreader', serif", fontSize: '16px', color: '#FFFFFF', transition: 'color 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C9A97E'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                onClick={onClose}
              >
                Gillead Safaris
              </Link>
              <button
                onClick={onClose}
                style={{ color: '#FFFFFF', transition: 'color 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C9A97E'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#FFFFFF'; }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-10 py-6">
              {menuLinks.map((link: NavLink, i) => {
                const hasSubs = !!(link.subLinks && link.subLinks.length > 0);
                const isExpanded = !!expandedLinks[link.label];
                // Fix: Ensure strict boolean result
                const isActive: boolean = !!(pathname && (pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname === sub.href))));

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    // On xl+ screens the navbar already shows these links, so the
                    // side menu only lists what the bar doesn't (Accommodation,
                    // Essentials, Sustainability). Below xl the bar collapses and
                    // the menu is the only nav, so everything shows.
                    className={`py-4 ${link.desktopNav ? 'xl:hidden' : ''}`}
                    onMouseEnter={hasSubs ? () => setExpandOnHover(link.label, true) : undefined}
                    onMouseLeave={hasSubs ? () => setExpandOnHover(link.label, false) : undefined}
                    style={{ borderBottom: '1px solid rgba(241,234,224,0.12)' }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Link
                        href={link.href}
                        className="block flex-1"
                        onClick={onClose}
                      >
                        <span
                          style={{
                            fontFamily: "'Newsreader', serif",
                            fontSize: 'clamp(20px, 3.5vw, 26px)',
                            fontWeight: 600,
                            color: isActive ? '#C9A97E' : '#FFFFFF',
                            letterSpacing: '-0.01em',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#C9A97E')}
                          onMouseLeave={e => (e.currentTarget.style.color = isActive ? '#C9A97E' : '#FFFFFF')}
                        >
                          {link.label}
                        </span>
                      </Link>

                      {hasSubs && (
                        <button
                          onClick={() => toggleExpand(link.label)}
                          className="p-2 ml-2 transition-colors duration-200"
                          style={{ color: isExpanded ? '#C9A97E' : '#FFFFFF' }}
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      )}
                    </div>

                    {hasSubs && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pl-4 mt-2 flex flex-col gap-3"
                      >
                        {link.subLinks?.map((sub, i, all) => {
                          const isSubActive = pathname === sub.href;
                          const startsGroup = sub.group && sub.group !== all[i - 1]?.group;
                          return (
                            <div key={sub.href} className="flex flex-col">
                            {startsGroup && (
                              <p className={i > 0 ? 'pt-2' : ''} style={{ ...subLabel, fontSize: '10px', color: '#C9A97E' }}>{sub.group}</p>
                            )}
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className="py-1 transition-colors duration-200"
                              style={{
                                ...chromeLink,
                                color: isSubActive ? '#C9A97E' : '#FFFFFF',
                                fontWeight: isSubActive ? 600 : 400
                              }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#C9A97E')}
                              onMouseLeave={e => (e.currentTarget.style.color = isSubActive ? '#C9A97E' : '#FFFFFF')}
                            >
                              {sub.label}
                            </Link>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
              {/* Desktop only: the bar already carries the main links, so the
                  drawer's spare space goes to how to reach the team. */}
              <div className="hidden xl:block mt-10">
                <div className="relative overflow-hidden mb-6" style={{ height: '180px', borderRadius: '2px' }}>
                  <CoverImage src={office.img} alt="Gillead Safaris vehicles out on a game drive" />
                </div>
                <p style={{ fontFamily: "'Newsreader', serif", fontSize: '22px', fontWeight: 600, color: '#FFFFFF', marginBottom: '14px' }}>
                  Talk to us in {office.city}
                </p>
                <div className="flex flex-col gap-1.5 mb-6">
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} style={{ ...chromeLink, color: '#FFFFFF' }} className="hover:!text-[#C9A97E] transition-colors">{office.phone}</a>
                  <a href={`mailto:${office.email}`} style={{ ...chromeLink, color: '#FFFFFF' }} className="hover:!text-[#C9A97E] transition-colors">{office.email}</a>
                  <span style={{ ...chromeSmall, color: '#FFFFFF', opacity: 0.75 }}>{office.hours}</span>
                </div>
                <div className="flex gap-2">
                  {socials.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex items-center justify-center text-white transition-colors hover:bg-[#8D694B] hover:border-[#8D694B]"
                      style={{ width: '38px', height: '38px', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            <div className="px-10 py-8" style={{ borderTop: '1px solid rgba(241,234,224,0.15)' }}>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2"
                style={{ ...subLabel, fontWeight: 700, color: '#E9A36B' }}
                onClick={onClose}
              >
                Plan your safari
              </Link>
              <p style={{ ...chromeSmall, color: '#FFFFFF', marginTop: '12px' }}>
                info@gilleadsafaris.com · +255 753 959 375
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
