import { motion } from 'motion/react';
import { stats } from './data';

export default function StatsStrip() {
  return (
    <section style={{ backgroundColor: '#8a694f' }} className="py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 400, color: '#d3ba8b', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginTop: '8px' }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
