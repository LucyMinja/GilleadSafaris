import Image from 'next/image';
import Link from 'next/link';
import { socials } from './data';
import { subLabel, chromeLink, chromeSmall } from '../chromeType';

export default function BrandColumn() {
  return (
    <div className="lg:col-span-2">
      <Link href="/" className="flex items-center gap-3 mb-6" style={{ textDecoration: 'none' }}>
        <Image src="/images/og2.png" alt="Gillead Safaris" width={52} height={52} className="w-12 h-12 object-contain" />
        <div>
          <div style={{ fontFamily: "'Newsreader', serif", fontSize: '16px', color: '#FFFFFF', lineHeight: 1 }}>Gillead Safaris</div>
          <div style={{ ...subLabel, fontSize: '10px', color: '#C9A97E', marginTop: '4px' }}>Tanzania</div>
        </div>
      </Link>
      <p style={{ ...chromeLink, lineHeight: 1.85, color: '#FFFFFF', maxWidth: '300px', marginBottom: '24px' }}>
        A Tanzanian-owned safari company built on honest service, deep local knowledge, and a genuine love for the wild places we call home.
      </p>
      <div className="flex flex-col gap-2 mb-8">
        <a href="tel:+255753959375" style={{ ...chromeLink, color: '#FFFFFF', transition: 'color 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.color = '#C9A97E')}
          onMouseOut={e => (e.currentTarget.style.color = '#FFFFFF')}>
          +255 753 959 375
        </a>
        <a href="mailto:info@gilleadsafaris.com" style={{ ...chromeLink, color: '#FFFFFF', transition: 'color 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.color = '#C9A97E')}
          onMouseOut={e => (e.currentTarget.style.color = '#FFFFFF')}>
          info@gilleadsafaris.com
        </a>
        <span style={{ ...chromeSmall, color: '#FFFFFF' }}>Arusha, Tanzania · Est. 2020</span>
      </div>
      <div className="flex items-center gap-2">
        {socials.map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
            style={{
              width: '40px', height: '40px', borderRadius: '2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(241,234,224,0.1)',
              color: '#FFFFFF',
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
              e.currentTarget.style.color = '#FFFFFF';
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
