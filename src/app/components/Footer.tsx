'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import '@/styles/globals.css';

const destinations = [
  { label: 'Serengeti', href: '/destinations#serengeti' },
  { label: 'Kilimanjaro', href: '/destinations#mount' },
  { label: 'Zanzibar', href: '/destinations#zanzibar' },
  { label: 'Ngorongoro', href: '/destinations#ngorongoro' },
  { label: 'Tarangire', href: '/destinations#tarangire' },
  { label: 'Arusha', href: '/destinations#arusha' },
];

const tours = [
  { label: '3 Days Classic Serengeti Safari', href: '/safaris?open=2' },
  { label: '4 Days Zanzibar Beach & Stone Town', href: '/safaris?open=9' },
  { label: '8 Days Best of Northern Tanzania', href: '/safaris?open=5' },
  { label: '8 Days Wildebeest Migration', href: '/safaris?open=6' },
  { label: '6 Days Ruaha, Mikumi & Udzungwa', href: '/safaris?open=8' },
  { label: '8 Days Tanzania Cultural Tour', href: '/safaris?open=10' },
];

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/gilleadsafaris',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gillead_safaris_',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gillead-safaris-tanzania-ltd-88747a231',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'TripAdvisor',
    href: 'https://www.tripadvisor.co.uk/Attraction_Review-g297913-d26799638-Reviews-Gillead_Safaris-Arusha_Arusha_Region.html',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 9.5c-.83 0-1.5-.67-1.5-1.5S7.17 11.5 8 11.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4 3.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 11 12 11s3.5 1.57 3.5 3.5S13.93 18 12 18zm4-3.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: 'Safari Tours', href: '/safaris' },
  { label: 'Accommodation', href: '/accommodation' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Culture & Heritage', href: '/culture' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#6D6753', borderTop: '1px solid rgba(241,234,224,0.15)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand col — spans 2 on large */}
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

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C9A97E', marginBottom: '20px' }}>
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link" style={{ fontSize: '13px', color: 'rgba(241,234,224,0.85)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = '#F1EAE0')}
                    onMouseOut={e => (e.currentTarget.style.color = 'rgba(241,234,224,0.85)')}>
                    <ArrowRight size={11} className="footer-arrow" style={{ color: '#C9A97E', flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C9A97E', marginBottom: '20px' }}>
              Destinations
            </h4>
            <ul className="flex flex-col gap-3">
              {destinations.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link" style={{ fontSize: '13px', color: 'rgba(241,234,224,0.85)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = '#F1EAE0')}
                    onMouseOut={e => (e.currentTarget.style.color = 'rgba(241,234,224,0.85)')}>
                    <ArrowRight size={11} className="footer-arrow" style={{ color: '#C9A97E', flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C9A97E', marginBottom: '20px' }}>
              Popular Tours
            </h4>
            <ul className="flex flex-col gap-3">
              {tours.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="footer-link" style={{ fontSize: '13px', color: 'rgba(241,234,224,0.85)', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.5, transition: 'color 0.2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = '#F1EAE0')}
                    onMouseOut={e => (e.currentTarget.style.color = 'rgba(241,234,224,0.85)')}>
                    <ArrowRight size={11} className="footer-arrow" style={{ color: '#C9A97E', flexShrink: 0, marginTop: '3px' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(241,234,224,0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: '12px', color: 'rgba(241,234,224,0.55)', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} Gillead Safaris Tanzania Ltd. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(241,234,224,0.55)', letterSpacing: '0.04em' }}>
            Registered in Tanzania · TALA Licensed
          </p>
        </div>
      </div>

    </footer>
  );
}
