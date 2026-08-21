import RevealOnView from '@/app/pages/home/RevealOnView';
import SafariButton from '@/app/components/SafariButton';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DetailCTA({ destName }: { destName: string }) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-20 lg:pb-28 text-center">
      <RevealOnView
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        duration={0.8}
        ease={EASE}
        once={false}
        margin="-60px"
      >
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 600, color: '#6D6753', marginBottom: '16px' }}>
          Ready to visit {destName.split(' ')[0]}?
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753', opacity: 0.8, maxWidth: '480px', margin: '0 auto 32px' }}>
          Our team is based in Arusha and can arrange every detail of your trip.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <SafariButton href="/booking" variant="secondary">Plan Your Safari</SafariButton>
          <SafariButton href="/contact" variant="secondary">Ask a Question</SafariButton>
        </div>
      </RevealOnView>
    </div>
  );
}
