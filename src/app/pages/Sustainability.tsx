import PageHero from '@/app/components/PageHero';
import RevealOnView from '@/app/pages/home/RevealOnView';
import CoverImage from '@/app/components/CoverImage';
import SafariButton from '@/app/components/SafariButton';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Shown only once the client confirms their porter policy (fair pay, weight
// limits, proper gear, KPAP partnership…). Until then the section stays off
// so the site never claims something that isn't true.
const PORTER_POLICY_CONFIRMED = false;

const eyebrow = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#8D694B', marginBottom: '14px' };
const headline = { fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '16px' };
const body = { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753' };

const tips = [
  { title: 'Leave the plastic bags at home', text: 'Tanzania banned them in 2019. Pack in fabric or reusable bags.' },
  { title: 'Ask before the photo', text: 'A smile and a question first, especially on village visits.' },
  { title: 'Carry it out', text: 'On the mountain and in the bush, everything that goes in comes back out.' },
];

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <RevealOnView className={className} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} duration={0.8} delay={delay} ease={EASE} once={false} margin="-80px">
      {children}
    </RevealOnView>
  );
}

export default function Sustainability() {
  return (
    <div style={{ backgroundColor: '#F1EAE0' }}>
      <PageHero
        title="Sustainability"
        subtitle="Tanzania's wildlife is the reason we exist. How we work has to show it."
        image="/images/px-elephants-waterhole.jpg"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 lg:py-28">
        <Reveal className="max-w-2xl mx-auto text-center mb-20 lg:mb-28">
          <h2 style={{ ...headline, fontSize: 'clamp(30px, 3.4vw, 46px)' }}>Small operator, honest promises</h2>
          <p style={body}>We're not a conservation charity, and we won't pretend to be. This is what we actually do on the ground.</p>
        </Reveal>

        {/* 1 — text left, large photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-center mb-24 lg:mb-32">
          <Reveal className="lg:col-span-5">
            <p style={eyebrow}>Every park fee counts</p>
            <h3 style={headline}>Your safari pays for the rangers</h3>
            <p style={body}>Park and conservation fees fund anti-poaching patrols and habitat care. Every trip we run is a reason for this land to stay wild.</p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 34vw, 480px)', borderRadius: '2px' }}>
              <CoverImage src="/images/px-sus-elephant-herd.jpg" alt="An elephant herd moving across the savanna" />
            </div>
          </Reveal>
        </div>

        {/* 2 — offset collage pair */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 mb-24 lg:mb-32">
          <Reveal className="lg:col-span-5">
            <p style={eyebrow}>Local first</p>
            <h3 style={headline}>Arranged with the village, not for it</h3>
            <p style={{ ...body, marginBottom: '24px' }}>Our guides are Tanzanian. Cultural visits are agreed directly with the community you meet.</p>
            <div className="relative overflow-hidden" style={{ height: 'clamp(380px, 38vw, 540px)', borderRadius: '2px' }}>
              <CoverImage src="/images/px-sus-maasai-village.jpg" alt="A Maasai man among goats outside a village home" sizes="(min-width: 1024px) 40vw, 100vw" position="center 30%" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:mt-32" delay={0.12}>
            <p style={eyebrow}>Room to breathe</p>
            <h3 style={headline}>The animal always comes first</h3>
            <p style={{ ...body, marginBottom: '24px' }}>We keep our distance, stay on the tracks and never crowd a sighting. No photo is worth stressing a lion.</p>
            <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 28vw, 400px)', borderRadius: '2px' }}>
              <CoverImage src="/images/px-sus-jeep-distance.jpg" alt="Elephants watched from a safari vehicle at a respectful distance" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </Reveal>
        </div>

        {/* 3 — mountain crews (hidden until the client confirms the policy) */}
        {PORTER_POLICY_CONFIRMED && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 items-center mb-24 lg:mb-32">
            <Reveal className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative overflow-hidden" style={{ height: 'clamp(380px, 40vw, 560px)', borderRadius: '2px' }}>
                <CoverImage src="/images/px-sus-kili-porter.jpg" alt="A porter carrying supplies on Kilimanjaro" position="center 35%" />
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2" delay={0.1}>
              <p style={eyebrow}>On the mountain</p>
              <h3 style={headline}>Fair loads, fair pay</h3>
              <p style={body}>Our porters carry within the park's weight limits, eat well and are paid properly. The summit is theirs too.</p>
            </Reveal>
          </div>
        )}

        {/* 4 — how travellers can help */}
        <Reveal className="pt-14 lg:pt-16 mb-20 lg:mb-24" >
          <div style={{ borderTop: '1px solid rgba(109,103,83,0.2)' }} className="pt-14 lg:pt-16">
            <h3 style={{ ...headline, textAlign: 'center', marginBottom: '40px' }}>Travel lightly</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-10 max-w-5xl mx-auto">
              {tips.map((t) => (
                <div key={t.title} className="text-center">
                  <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '20px', fontWeight: 600, color: '#6D6753', marginBottom: '8px' }}>{t.title}</p>
                  <p style={{ ...body, fontSize: '17px', opacity: 0.85 }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="text-center">
          <SafariButton href="/booking">Plan a responsible safari</SafariButton>
        </Reveal>
      </div>
    </div>
  );
}
