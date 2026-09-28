import { MapPin } from 'lucide-react';
import RevealOnView from '@/app/pages/home/RevealOnView';
import CoverImage from '@/app/components/CoverImage';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HistorySection({
  dest,
  img,
}: {
  dest: { name: string; history: string[]; facts: { size: string; bestTime: string; animals: string }; highlights: string[] };
  img: string;
}) {
  const [firstPara, ...restParas] = dest.history;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-20 lg:pt-28 pb-6 lg:pb-8">
      {/* Opening paragraph paired with a real photo — order adjusted for mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 lg:items-center mb-10 lg:mb-14">
        {/* Text column — order-1 on mobile */}
        <RevealOnView
          className="lg:col-span-5 order-1 lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>History & Story</p>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.2, marginBottom: '24px' }}>
            The story behind {dest.name.split(' ')[0]}
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753' }}>{firstPara}</p>
        </RevealOnView>

        {/* Image column — order-2 on mobile */}
        <RevealOnView
          className="lg:col-span-7 order-2 lg:order-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          duration={0.8}
          delay={0.1}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <div className="relative overflow-hidden" style={{ height: 'clamp(320px, 34vw, 460px)', borderRadius: '2px' }}>
            <CoverImage src={img} priority />
          </div>
        </RevealOnView>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
        <RevealOnView
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          duration={0.8}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <div className="flex flex-col gap-5">
            {restParas.map((para, i) => (
              <p key={i} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', lineHeight: 1.8, color: '#6D6753' }}>{para}</p>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          duration={0.8}
          delay={0.1}
          ease={EASE}
          once={false}
          margin="-80px"
        >
          <div className="p-8" style={{ backgroundColor: '#ffffff', borderRadius: '4px', border: '1px solid rgba(109,103,83,0.12)' }}>
            <div className="flex flex-col gap-5 mb-7">
              {[
                { label: 'Size', value: dest.facts.size },
                { label: 'Best Time to Visit', value: dest.facts.bestTime },
                { label: 'Wildlife', value: dest.facts.animals },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <MapPin size={13} strokeWidth={1.5} color="#8D694B" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6" style={{ borderTop: '1px solid rgba(109,103,83,0.12)' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '12px' }}>Highlights</p>
              <div className="flex flex-col gap-2.5">
                {dest.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753' }}>
                    <div style={{ width: '4px', height: '4px', backgroundColor: '#8D694B', borderRadius: '50%', flexShrink: 0 }} />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnView>
      </div>
    </div>
  );
}
