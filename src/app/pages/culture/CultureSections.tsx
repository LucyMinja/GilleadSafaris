import RevealOnView from '@/app/pages/home/RevealOnView';
import WordReveal from '@/app/components/WordReveal';
import CoverImage from '@/app/components/CoverImage';
import { sections } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CultureSections() {
  return (
    <>
      {sections.map((section) => {
        const isReverse = section.reverse;
        const [firstPara, ...restParas] = section.desc.split('\n\n');
        return (
          <div key={section.id} className="max-w-[1400px] mx-auto px-6 lg:px-16 py-10 lg:py-14">
            {/* Headline — placed before the photo so the title reads first,
                giving a brief orientation before the image rather than
                after it. No eyebrow/tag, no rule, just the title. */}
            <RevealOnView
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              duration={0.7}
              ease={EASE}
              once={false}
              margin="-80px"
              className="mb-8 lg:mb-10 text-center"
            >
              <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.1 }}>
                {section.title}
              </h2>
            </RevealOnView>

            {/* Banner — a single full-width photo, or a clean diptych when a
                second real photo exists. Never resized to match text; the
                text is built to run alongside it, not the other way round. */}
            <RevealOnView
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              duration={1}
              ease={EASE}
              once={false}
              margin="-100px"
              className="mb-10 lg:mb-14"
            >
              {section.img2 ? (
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 34vw, 460px)', borderRadius: '2px' }}>
                    <CoverImage src={section.img} alt={section.title} />
                  </div>
                  <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 34vw, 460px)', borderRadius: '2px' }}>
                    <CoverImage src={section.img2} alt={section.title} />
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden" style={{ height: 'clamp(340px, 46vw, 560px)', borderRadius: '2px' }}>
                  <CoverImage src={section.img} alt={section.title} />
                </div>
              )}
            </RevealOnView>

            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 ${isReverse ? '' : ''}`}>
              {/* Running text — real print-style two columns on desktop
                  instead of a single block squeezed beside a photo, with a
                  pull-quote breaking across both columns partway through. */}
              <div className={`lg:col-span-8 ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="lg:columns-2 lg:gap-10">
                  <div style={{ breakInside: 'avoid' }} className="mb-4">
                    <WordReveal
                      text={firstPara}
                      once={false}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, color: '#6D6753' }}
                    />
                  </div>

                  <p
                    style={{
                      breakInside: 'avoid',
                      columnSpan: 'all' as const,
                      fontFamily: "'Newsreader', Georgia, serif",
                      fontStyle: 'italic',
                      fontWeight: 500,
                      fontSize: 'clamp(21px, 2vw, 27px)',
                      lineHeight: 1.5,
                      color: '#8D694B',
                      margin: '10px 0 22px',
                      maxWidth: '640px',
                    }}
                  >
                    {section.quote}
                  </p>

                  {restParas.map((para, j) => (
                    <div key={j} style={{ breakInside: 'avoid' }} className="mb-4">
                      <WordReveal
                        text={para}
                        once={false}
                        baseDelay={j * 0.2}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', lineHeight: 1.8, color: '#6D6753' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Facts sidebar — a real margin note beside the running
                  text, not another stacked block underneath a photo. */}
              <div className={`lg:col-span-4 ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}>
                <RevealOnView
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  duration={0.6}
                  ease={EASE}
                  once={false}
                  margin="-60px"
                >
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>Key Facts</p>
                </RevealOnView>
                <div className="flex flex-col gap-3" style={{ borderLeft: '1px solid rgba(141,105,75,0.3)' }}>
                  {section.facts.map((fact, k) => (
                    <RevealOnView
                      key={fact}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      duration={0.5}
                      delay={k * 0.08}
                      ease={EASE}
                      once={false}
                      margin="-60px"
                      style={{ paddingLeft: '16px' }}
                    >
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', lineHeight: 1.6, color: '#6D6753', opacity: 0.9 }}>
                        {fact}
                      </div>
                    </RevealOnView>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
