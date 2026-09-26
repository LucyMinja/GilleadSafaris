import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import { menuLinks } from './data';

export default function MenuOverlay({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const [expandedLinks, setExpandedLinks] = useState<Record<string, boolean>>({});

  const toggleExpand = (label: string) => {
    setExpandedLinks(prev => ({ ...prev, [label]: !prev[label] }));
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
            style={{ backgroundColor: '#6D6753', borderLeft: '1px solid rgba(241,234,224,0.15)' }}
          >
            <div className="flex items-center justify-between px-10 py-8" style={{ borderBottom: '1px solid rgba(241,234,224,0.15)' }}>
              <Link
                href="/"
                style={{ fontFamily: "'Newsreader', serif", fontSize: '15px', color: 'rgba(241,234,224,0.75)', transition: 'color 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C9A97E'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(241,234,224,0.75)'; }}
                onClick={onClose}
              >
                Gillead Safaris
              </Link>
              <button
                onClick={onClose}
                style={{ color: 'rgba(241,234,224,0.6)', transition: 'color 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#C9A97E'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(241,234,224,0.6)'; }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-10 py-6">
              {menuLinks.map((link, i) => {
                const hasSubs = link.subLinks && link.subLinks.length > 0;
                const isExpanded = !!expandedLinks[link.label];
                const isActive = pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname === sub.href));

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="py-4"
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
                            color: isActive ? '#C9A97E' : 'rgba(241,234,224,0.85)',
                            letterSpacing: '-0.01em',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#C9A97E')}
                          onMouseLeave={e => (e.currentTarget.style.color = isActive ? '#C9A97E' : 'rgba(241,234,224,0.85)')}
                        >
                          {link.label}
                        </span>
                      </Link>

                      {hasSubs && (
                        <button
                          onClick={() => toggleExpand(link.label)}
                          className="p-2 ml-2 transition-colors duration-200"
                          style={{ color: isExpanded ? '#C9A97E' : 'rgba(241,234,224,0.5)' }}
                        >
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      )}
                    </div>

                    {/* Sub-links section for mobile/overlay */}
                    {hasSubs && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pl-4 mt-2 flex flex-col gap-3"
                      >
                        {link.subLinks?.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className="text-[14px] py-1 transition-colors duration-200"
                              style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                color: isSubActive ? '#C9A97E' : 'rgba(241,234,224,0.65)',
                                fontWeight: isSubActive ? 600 : 400
                              }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#C9A97E')}
                              onMouseLeave={e => (e.currentTarget.style.color = isSubActive ? '#C9A97E' : 'rgba(241,234,224,0.65)')}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            <div className="px-10 py-8" style={{ borderTop: '1px solid rgba(241,234,224,0.15)' }}>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2"
                style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A97E', fontWeight: 500 }}
                onClick={onClose}
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
  );
}
