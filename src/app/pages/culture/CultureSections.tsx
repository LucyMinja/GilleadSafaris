import RevealOnView from '@/app/pages/home/RevealOnView';
import { sections } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CultureSections() {
  return (
    <>
      {sections.map((section, i) => {
        const isReverse = section.reverse;
        return (
          <div key={section.id} className="max-w-[1400px] mx-auto px-6 lg:px-16 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 lg:items-center">
            <RevealOnView
              className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}
              initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              duration={0.8}
              ease={EASE}
              once={false}
              margin="-80px"
            >
              <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 34vw, 460px)', borderRadius: '2px' }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${section.img}')`, backgroundColor: '#8D694B' }} />
              </div>
            </RevealOnView>

            <RevealOnView
              className={`lg:col-span-5 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}
              initial={{ opacity: 0, x: isReverse ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              duration={0.8}
              delay={0.1}
              ease={EASE}
              once={false}
              margin="-80px"
            >
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>{section.sub}</p>
              <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 2.6vw, 36px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '20px' }}>
                {section.title}
              </h2>
              <div className="flex flex-col gap-4 mb-8">
                {section.desc.split('\n\n').map((para, j) => (
                  <p key={j} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, color: '#6D6753' }}>{para}</p>
                ))}
              </div>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '12px' }}>Key Facts</p>
              <div className="flex flex-col gap-2.5">
                {section.facts.map((fact) => (
                  <div key={fact} className="flex items-start gap-2.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', lineHeight: 1.6, color: '#6D6753', opacity: 0.9 }}>
                    <div style={{ width: '4px', height: '4px', backgroundColor: '#8D694B', borderRadius: '50%', flexShrink: 0, marginTop: '8px' }} />
                    {fact}
                  </div>
                ))}
              </div>
            </RevealOnView>
          </div>
        );
      })}
    </>
  );
}
