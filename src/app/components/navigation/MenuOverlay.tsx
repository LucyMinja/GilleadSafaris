import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
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

            <nav className="flex-1 overflow-y-auto px-10 py-10">
              {menuLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className={`py-5${link.desktopNav ? ' xl:hidden' : ''}`}
                    style={{ borderBottom: '1px solid rgba(241,234,224,0.15)' }}
                  >
                    <Link
                      href={link.href}
                      className="block"
                      onClick={onClose}
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
