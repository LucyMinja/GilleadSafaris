import { motion } from 'motion/react';
import { sections } from './data';

export default function CultureSections() {
  return (
    <>
      {sections.map((section, i) => {
        const isReverse = section.reverse;
        const textBg = i % 2 === 0 ? '#faf7f4' : '#ffffff';
        return (
          <section
            key={section.id}
            className={`relative flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            style={{ backgroundColor: textBg, minHeight: 'auto' }}
          >
            <motion.div
              className={`relative w-full lg:w-[54%] min-h-[420px] lg:min-h-[680px] flex-shrink-0 overflow-hidden ${isReverse ? 'clip-diag-l' : 'clip-diag-r'}`}
              initial={{ opacity: 0, x: isReverse ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${section.img})`,
                  backgroundColor: '#c4a882',
                  transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </motion.div>

            <motion.div
              className="flex-1 flex flex-col justify-center px-6 py-12 lg:py-20 lg:px-[6vw]"
              initial={{ opacity: 0, x: isReverse ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ maxWidth: '460px', width: '100%' }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '20px' }}>{section.sub}</p>
                <h2 style={{
                  fontFamily: "'DM Serif Display', sans-serif",
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: '#1a1a1a',
                  marginBottom: '28px',
                  letterSpacing: '-0.01em',
                }}>
                  {section.title}
                </h2>
                <div className="space-y-4 mb-10">
                  {section.desc.split('\n\n').map((para, j) => (
                    <p key={j} style={{ fontSize: '15px', lineHeight: 1.9, color: '#5a5047', fontWeight: 300 }}>{para}</p>
                  ))}
                </div>
                <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a694f', marginBottom: '14px' }}>Key Facts</p>
                <ul className="space-y-2.5">
                  {section.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3" style={{ fontSize: '13px', lineHeight: 1.6, color: '#5a5047' }}>
                      <span style={{ color: '#d3ba8b', flexShrink: 0, marginTop: '3px', fontSize: '16px' }}>·</span> {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>
        );
      })}
    </>
  );
}
