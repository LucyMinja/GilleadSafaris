import SafariButton from '@/app/components/SafariButton';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';
import CoverImage from '@/app/components/CoverImage';
import { stats } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function StorySection() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-20 lg:pt-28 pb-6 lg:pb-8 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 lg:items-center">
      <RevealOnView
        className="lg:col-span-5 lg:order-1"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        duration={0.8}
        ease={EASE}
        once={false}
        margin="-80px"
      >
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Who We Are</p>
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '24px' }}>
          Tanzania's wildlife, your adventure
        </h2>
        <div className="flex flex-col gap-4 mb-8">
          <WordReveal
            text="Gillead Safaris is a safari and tour operation based in Arusha — Africa's gateway to some of its greatest wildlife. We're built on one belief: extraordinary safaris should be honest, personal, and rooted in the communities they pass through."
            once={false}
            baseDelay={0}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753' }}
          />
          <WordReveal
            text="Since 2020, we've grown from two guides and a shared vehicle to a full fleet and a network of trusted lodges — without losing the habit of building every itinerary around a conversation, not a template."
            once={false}
            baseDelay={0.5}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753' }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4 mb-10">
          <SafariButton href="/safaris" className="w-full sm:w-auto">Our Safaris</SafariButton>
          <SafariButton href="/contact" variant="secondary" className="w-full sm:w-auto">Contact Us</SafariButton>
        </div>

        {/* Quiet inline facts instead of a shouty full-bleed stats band —
            the homepage already cut its Stats section for reading as
            generic filler; the same numbers deserve a lower-key treatment
            here, not a colored block. */}
        <div className="flex flex-wrap gap-x-10 gap-y-4" style={{ borderTop: '1px solid rgba(109,103,83,0.15)', paddingTop: '24px' }}>
          {stats.map((s, i) => (
            <RevealOnView
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              duration={0.6}
              delay={1.1 + i * 0.1}
              ease={EASE}
              once={false}
              margin="-40px"
            >
              <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '28px', fontWeight: 600, color: '#6D6753', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', color: '#6D6753', opacity: 0.7, marginTop: '4px' }}>{s.label}</p>
            </RevealOnView>
          ))}
        </div>
      </RevealOnView>

      <RevealOnView
        className="lg:col-span-7 lg:order-2"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        duration={0.8}
        delay={0.1}
        ease={EASE}
        once={false}
        margin="-80px"
      >
        <div className="relative overflow-hidden" style={{ height: 'clamp(360px, 40vw, 560px)', borderRadius: '2px' }}>
          <CoverImage src="/images/IMG_1068.jpg" priority />
        </div>
      </RevealOnView>
    </div>
  );
}
