import { Leaf, Users, MapPin, Recycle } from 'lucide-react';
import PageHero from '@/app/components/PageHero';
import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const principles = [
  {
    icon: <Leaf size={22} strokeWidth={1.5} />,
    title: 'Tourism That Funds Protection',
    desc: 'The parks and conservation areas we visit depend on entrance and conservation fees to fund their own rangers, anti-poaching patrols, and habitat management. Every safari we run is, in a direct sense, a reason for that land to stay protected.',
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: 'Local First',
    desc: 'Our guides and drivers are Tanzanian, based in Arusha, and know these parks firsthand. Where a safari includes a cultural visit, it is arranged directly with the community you meet rather than through a third party — a real exchange, not a staged one.',
  },
  {
    icon: <MapPin size={22} strokeWidth={1.5} />,
    title: 'Respecting the Wildlife We Show You',
    desc: 'We follow park rules on viewing distances, off-road driving, and vehicle numbers at sightings. A closer photo is never worth stressing an animal or damaging the habitat other travellers will see after you.',
  },
  {
    icon: <Recycle size={22} strokeWidth={1.5} />,
    title: 'Lighter Footprint, Where We Can Control It',
    desc: "We encourage refillable water bottles over single-use plastic on our vehicles, and work with camps and lodges that do the same. It's a small thing next to the scale of these ecosystems, but it's the part that's actually within our control.",
  },
];

export default function Sustainability() {
  return (
    <div>
      <PageHero
        title="Sustainability"
        subtitle="Tanzania's wildlife is the reason we exist as a company — how we operate has to reflect that, not just say it."
        image="/images/px-elephants-waterhole.jpg"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <RevealOnView
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          duration={0.7}
          ease={EASE}
          once={false}
          margin="-80px"
          className="max-w-2xl mx-auto text-center mb-16 lg:mb-20"
        >
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', marginBottom: '20px' }}>
            How we try to get this right
          </h2>
          <WordReveal
            text="We're a small operator, not a conservation NGO — we don't claim programs or funds we don't run. What follows is what we actually do, day to day, on the ground in Tanzania."
            once={false}
            className="justify-center"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753' }}
          />
        </RevealOnView>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14">
          {principles.map((p, i) => (
            <RevealOnView
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              duration={0.7}
              delay={i * 0.08}
              ease={EASE}
              once={false}
              margin="-60px"
            >
              <div style={{ color: '#8D694B', marginBottom: '18px' }}>{p.icon}</div>
              <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.25, marginBottom: '12px' }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, color: '#6D6753', opacity: 0.85 }}>
                {p.desc}
              </p>
            </RevealOnView>
          ))}
        </div>
      </div>
    </div>
  );
}
