import Image from 'next/image';
import Link from 'next/link';
import { socials } from './data';

export default function BrandColumn() {
  return (
    <div className="lg:col-span-2">
      <Link href="/" className="flex items-center gap-3 mb-6" style={{ textDecoration: 'none' }}>
        <Image src="/logo.gif" alt="Gillead Safaris" width={52} height={52} className="w-auto h-12 object-contain" />
        <div>
          <div style={{ fontFamily: "'Newsreader', serif", fontSize: '16px', color: '#F1EAE0', lineHeight: 1 }}>Gillead Safaris</div>
          <div style={{ fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A97E', marginTop: '3px' }}>Tanzania</div>
        </div>
      </Link>
      <p style={{ fontSize: '13px', lineHeight: 1.95, color: 'rgba(241,234,224,0.7)', fontWeight: 300, maxWidth: '300px', marginBottom: '24px' }}>
        A Tanzanian-owned safari company built on honest service, deep local knowledge, and a genuine love for the wild places we call home.
      </p>
      <div className="flex flex-col gap-2 mb-8">
        <a href="tel:+255753959375" style={{ fontSize: '13px', color: 'rgba(241,234,224,0.75)', transition: 'color 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.color = '#F1EAE0')}
          onMouseOut={e => (e.currentTarget.style.color = 'rgba(241,234,224,0.75)')}>
          +255 753 959 375
        </a>
        <a href="mailto:info@gillieadsafaris.com" style={{ fontSize: '13px', color: 'rgba(241,234,224,0.75)', transition: 'color 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.color = '#F1EAE0')}
          onMouseOut={e => (e.currentTarget.style.color = 'rgba(241,234,224,0.75)')}>
          info@gillieadsafaris.com
        </a>
        <span style={{ fontSize: '12px', color: 'rgba(241,234,224,0.5)' }}>Arusha, Tanzania · Est. 2020</span>
      </div>
      <div className="flex items-center gap-2">
        {socials.map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
            style={{
              width: '40px', height: '40px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(241,234,224,0.1)',
              color: '#F1EAE0',
              border: '1px solid rgba(241,234,224,0.18)',
              transition: 'background-color 0.25s, color 0.25s, transform 0.2s, box-shadow 0.25s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#8D694B';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.08)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
              e.currentTarget.style.borderColor = '#8D694B';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'rgba(241,234,224,0.1)';
              e.currentTarget.style.color = '#F1EAE0';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(241,234,224,0.18)';
            }}
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
