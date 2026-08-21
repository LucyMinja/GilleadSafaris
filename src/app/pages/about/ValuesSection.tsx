import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';
import { values } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ValuesSection() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-6 lg:pb-8">
      <div className="text-center mb-8 lg:mb-10">
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>What Drives Us</p>
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753' }}>
          Our Values
        </h2>
      </div>

      <div className="flex flex-col gap-16 lg:gap-24">
        {values.map((v, i) => {
          const isReverse = i % 2 === 1;
          return (
            <div key={v.title} className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 lg:items-center">
              <RevealOnView
                className={`lg:col-span-7 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}
                initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                duration={0.8}
                ease={EASE}
                once={false}
                margin="-80px"
              >
                <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 30vw, 400px)', borderRadius: '2px' }}>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${v.img}')`, backgroundColor: '#8D694B' }} />
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
                <div style={{ color: '#8D694B', marginBottom: '18px' }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '16px' }}>{v.title}</h3>
                <WordReveal
                  text={v.desc}
                  once={false}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, color: '#6D6753' }}
                />
              </RevealOnView>
            </div>
          );
        })}
      </div>
    </div>
  );
}
