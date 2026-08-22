import RevealOnView from '@/app/pages/home/RevealOnView';
import { cuisine } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Text-only, deliberately — the four dish "photos" in the old version were
// generic stock images that didn't actually show these dishes, the same
// mismatch problem flagged elsewhere on this site. No real photography of
// these specific dishes exists in the library yet, so this stays honest
// rather than reusing unrelated food photos.
export default function CuisineSection() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-20 lg:pb-28 text-center">
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Taste Tanzania</p>
      <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', marginBottom: '48px' }}>
        Flavours of East Africa
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10 max-w-[1100px] mx-auto text-left">
        {cuisine.map((dish, i) => (
          <RevealOnView
            key={dish.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.7}
            delay={i * 0.08}
            ease={EASE}
            once={false}
            margin="-40px"
          >
            <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '20px', fontWeight: 600, color: '#6D6753', marginBottom: '10px' }}>{dish.name}</h3>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', lineHeight: 1.75, color: '#6D6753', opacity: 0.85 }}>{dish.desc}</p>
          </RevealOnView>
        ))}
      </div>
    </div>
  );
}
