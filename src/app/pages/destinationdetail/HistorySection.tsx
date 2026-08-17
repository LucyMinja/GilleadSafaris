import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function HistorySection({
  dest,
}: {
  dest: { name: string; history: string[]; facts: { size: string; bestTime: string; animals: string }; highlights: string[] };
}) {
  return (
    <section className="py-24 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-80px' }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: '24px', height: '1px', backgroundColor: '#d3ba8b' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b' }}>History & Story</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 400, color: '#000000', lineHeight: 1.2, marginBottom: '28px' }}>
            The story behind<br /><em style={{ color: '#8a694f' }}>{dest.name.split(' ')[0]}</em>
          </h2>
          <div className="space-y-5">
            {dest.history.map((para, i) => (
              <p key={i} style={{ fontSize: '15px', lineHeight: 2, color: '#444444', fontWeight: 300 }}>{para}</p>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, margin: '-80px' }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Size', value: dest.facts.size },
              { label: 'Best Time to Visit', value: dest.facts.bestTime },
              { label: 'Wildlife', value: dest.facts.animals },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start gap-4 p-5" style={{ backgroundColor: '#faf7f4', border: '1px solid #f0e8dc', borderRadius: '12px' }}>
                <MapPin size={16} strokeWidth={1.5} style={{ color: '#d3ba8b', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '4px' }}>{label}</p>
                  <p style={{ fontSize: '14px', color: '#000000' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6" style={{ backgroundColor: '#8a694f', borderRadius: '14px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '14px' }}>Highlights</p>
            <ul className="space-y-2.5">
              {dest.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#d3ba8b', flexShrink: 0 }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
