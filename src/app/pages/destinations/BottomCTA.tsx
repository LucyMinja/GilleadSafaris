import SafariButton from '@/app/components/SafariButton';
import RevealOnView from '@/app/pages/home/RevealOnView';
import MaskReveal from '@/app/pages/home/MaskReveal';

// Same gentler, evenly-paced curve as DestinationRow — the site's usual
// [0.22, 1, 0.36, 1] shoots to ~90% almost instantly then imperceptibly
// creeps the rest, which read as "no animation" on a normal scroll.
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function BottomCTA() {
  return (
    <section style={{ backgroundColor: '#F1EAE0' }} className="py-20 lg:py-28">
      <RevealOnView
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        duration={1.1}
        ease={EASE}
        once={false}
        margin="0px"
        className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center"
      >
        <MaskReveal viewport duration={0.6} style={{ marginBottom: '16px' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8D694B' }}>
            Not sure where to start?
          </p>
        </MaskReveal>
        <MaskReveal viewport duration={0.7} delay={0.2} style={{ marginBottom: '18px' }}>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Tell us what you're hoping to see
          </h2>
        </MaskReveal>
        <MaskReveal viewport duration={0.7} delay={0.4} style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', color: '#6D6753', lineHeight: 1.8, fontWeight: 400, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Our Arusha-based team has driven every one of these parks. Tell us your dates and interests, and we'll build a route around them.
          </p>
        </MaskReveal>
        <MaskReveal viewport duration={0.6} delay={0.6}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <SafariButton href="/booking">
              Start Planning
            </SafariButton>
            <SafariButton href="/contact" variant="secondary">
              Contact Us
            </SafariButton>
          </div>
        </MaskReveal>
      </RevealOnView>
    </section>
  );
}
