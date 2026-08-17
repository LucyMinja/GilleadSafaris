import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, Clock, Maximize2 } from 'lucide-react';
import type { Destination } from './data';

export default function DestinationRow({ dest, index }: { dest: Destination; index: number }) {
  const isReverse = index % 2 === 1;
  const textBg = index % 2 === 0 ? '#faf7f4' : '#ffffff';

  return (
    <motion.article
      id={dest.name.split(' ')[0].toLowerCase()}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className={`group relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
      style={{ backgroundColor: textBg, minHeight: 'auto' }}
    >
      <div
        className="destination-photo-panel relative w-full lg:w-[50%] min-h-[300px] lg:min-h-[560px] flex-shrink-0 overflow-hidden"
        style={{
          clipPath: isReverse
            ? 'polygon(160px 0, 100% 0, 100% 100%, 0 100%)'
            : 'polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${dest.heroImg})`, backgroundColor: '#d3ba8b' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.3) 100%)' }} />
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:py-20 lg:px-[6vw]">
        <div style={{ maxWidth: '460px', width: '100%' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d3ba8b' }}>
              <MapPin size={10} strokeWidth={1.5} /> {dest.region}
            </div>
            <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a694f', backgroundColor: 'rgba(138,105,79,0.1)', padding: '3px 10px', borderRadius: '100px', fontWeight: 600 }}>
              {dest.tag}
            </span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, sans-serif", fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 300, color: '#1a1a1a', marginBottom: '18px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            {dest.name}
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#5a5047', marginBottom: '28px', fontWeight: 300 }}>
            {dest.desc}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-8">
            {dest.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2" style={{ fontSize: '12px', color: '#8a694f' }}>
                <div style={{ width: '4px', height: '4px', backgroundColor: '#d3ba8b', borderRadius: '50%', flexShrink: 0 }} />
                {h}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 mb-8" style={{ fontSize: '11px', color: '#888888' }}>
            <div className="flex items-center gap-1.5">
              <Clock size={11} strokeWidth={1.5} />
              <span>{dest.bestTime}</span>
            </div>
            <span style={{ color: '#e0d4c8' }}>·</span>
            <div className="flex items-center gap-1.5">
              <Maximize2 size={11} strokeWidth={1.5} />
              <span>{dest.size}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {dest.slug && (
              <Link href={`/destinations/${dest.slug}`} className="btn-primary">
                Read the Story <ArrowUpRight size={11} strokeWidth={1.5} />
              </Link>
            )}
            <Link href="/booking" className="btn-secondary">
              Plan a Safari Here
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
