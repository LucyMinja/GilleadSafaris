import PageHero from '@/app/components/PageHero';
import { lodges } from './accommodation/lodges';
import LodgeRow from './accommodation/LodgeRow';

export default function Accommodation() {
  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Accommodation"
        subtitle="Every property handpicked. Every stay intentional. From baobab treehouses to oceanfront villas."
        image="/images/px-safari-tent.jpg"
        imagePosition="center 55%"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-14 lg:pt-16 text-center">
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.01em' }}>
          Rest as well as you adventure
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753', maxWidth: '1100px', margin: '0 auto' }}>
          We offer stays as memorable as the safari itself — from kopje-built tented suites to crater-rim lodges and private beach villas. Every property below is one our team knows firsthand and would happily book for our own families.
        </p>
      </div>

      <div className="flex flex-col">
        {lodges.map((lodge, i) => (
          <LodgeRow key={lodge.id} lodge={lodge} index={i} />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-10 text-center" style={{ borderTop: '1px solid rgba(109,103,83,0.15)' }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#6D6753', opacity: 0.7, lineHeight: 1.8, maxWidth: '560px', margin: '0 auto' }}>
          These properties are shown for inspiration. When you book a safari with us, our team selects and confirms the right lodge for your dates, group size, and budget.
        </p>
      </div>
    </div>
  );
}
