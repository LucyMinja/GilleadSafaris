import RevealOnView from '@/app/pages/home/RevealOnView';
import { team } from './data';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TeamSection() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-6 lg:pb-8">
      <div className="text-center mb-14 lg:mb-20">
        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '14px' }}>The People Behind Your Safari</p>
        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 600, color: '#6D6753' }}>
          Meet the Team
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 swipe-row">
        {team.map((member, i) => (
          <RevealOnView
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.7}
            delay={i * 0.1}
            ease={EASE}
            once={false}
            margin="-60px"
          >
            <div className="relative overflow-hidden mb-5" style={{ height: '300px', borderRadius: '2px' }}>
              <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '20px', fontWeight: 600, color: '#6D6753', marginBottom: '4px' }}>{member.name}</h3>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8D694B', marginBottom: '12px' }}>{member.role}</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', lineHeight: 1.75, color: '#6D6753', opacity: 0.85 }}>{member.bio}</p>
          </RevealOnView>
        ))}
      </div>
    </div>
  );
}
