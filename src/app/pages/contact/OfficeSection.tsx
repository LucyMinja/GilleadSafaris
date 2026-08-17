import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import { offices } from './data';

export default function OfficeSection() {
  return (
    <>
      {offices.map((office) => (
        <motion.section
          key={office.city}
          className="relative flex flex-col lg:flex-row"
          style={{ backgroundColor: '#faf7f4' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="group relative w-full lg:w-[50%] min-h-[300px] lg:min-h-[520px] flex-shrink-0 overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${office.img})`, backgroundColor: '#8a694f' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.28) 100%)' }} />
          </div>

          <div className="flex-1 flex flex-col justify-center py-14 px-6 lg:py-20 lg:px-[6vw]">
            <div style={{ maxWidth: '400px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '10px' }}>Our Office</p>
              <h2 style={{ fontFamily: "'DM Serif Display', sans-serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '28px' }}>
                {office.city}, {office.country}
              </h2>
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3" style={{ fontSize: '14px', color: '#5a5047' }}>
                  <MapPin size={15} className="text-[#d3ba8b] shrink-0 mt-0.5" /> {office.address}
                </div>
                <a href={`tel:${office.phone}`} className="flex items-center gap-3 transition-colors" style={{ fontSize: '14px', color: '#5a5047' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#8a694f')}
                  onMouseOut={e => (e.currentTarget.style.color = '#5a5047')}>
                  <Phone size={15} className="text-[#d3ba8b]" /> {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="flex items-center gap-3 transition-colors" style={{ fontSize: '14px', color: '#5a5047' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#8a694f')}
                  onMouseOut={e => (e.currentTarget.style.color = '#5a5047')}>
                  <Mail size={15} className="text-[#d3ba8b]" /> {office.email}
                </a>
                <div className="flex items-center gap-3" style={{ fontSize: '14px', color: '#5a5047' }}>
                  <Clock size={15} className="text-[#d3ba8b]" /> {office.hours}
                </div>
              </div>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/gilleadsafaris' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/gillead_safaris_' },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-opacity hover:opacity-75"
                    style={{ fontSize: '11px', backgroundColor: 'rgba(211,186,139,0.1)', border: '1px solid rgba(211,186,139,0.3)', color: '#8a694f' }}>
                    <Icon size={13} /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      ))}
    </>
  );
}
