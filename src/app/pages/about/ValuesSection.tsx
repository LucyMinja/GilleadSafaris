import { motion } from 'motion/react';
import { values } from './data';

export default function ValuesSection() {
  return (
    <div style={{ backgroundColor: '#faf7f4' }}>
      <div className="text-center pt-24 pb-10 px-6">
        <p style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '16px' }}>What Drives Us</p>
        <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.2 }}>
          Our Values
        </h2>
      </div>
      {values.map((v, i) => {
        const isReverse = i % 2 === 1;
        const textBg = i % 2 === 0 ? '#faf7f4' : '#ffffff';
        return (
          <motion.div
            key={v.title}
            className={`relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            style={{ backgroundColor: textBg, minHeight: 'auto' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`relative w-full lg:w-[38%] min-h-[240px] lg:min-h-[420px] flex-shrink-0 overflow-hidden ${isReverse ? 'clip-diag-l-sm' : 'clip-diag-r-sm'}`}>
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${v.img})` }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.3) 0%, rgba(20,10,4,0.7) 100%)' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-5 text-center px-10">
                  <div style={{ color: '#d3ba8b', opacity: 0.95 }}>{v.icon}</div>
                  <p style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center py-10 px-6 lg:py-16 lg:px-[6vw]">
              <div style={{ maxWidth: '460px', width: '100%' }}>
                <h3 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 300, color: '#1a1a1a', marginBottom: '16px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{v.title}</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#5a5047', fontWeight: 300 }}>{v.desc}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
