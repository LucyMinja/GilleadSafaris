import { motion } from 'motion/react';
import { team } from './data';

export default function TeamSection() {
  return (
    <section className="py-28 px-6 lg:px-20" style={{ backgroundColor: '#faf7f4' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>The People Behind Your Safari</p>
          <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.2 }}>
            Meet the Team
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 6px 32px rgba(0,0,0,0.08)' }}
            >
              <div className="relative overflow-hidden" style={{ height: '280px' }}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6 bg-white">
                <p style={{ fontSize: '13px', lineHeight: 1.85, color: '#5a5047', fontWeight: 300 }}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
