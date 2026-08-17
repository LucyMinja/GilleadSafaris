import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function BottomCTA() {
  return (
    <section style={{ backgroundColor: '#FAF7F0', borderTop: '1px solid #F0E8DC' }} className="py-20 px-6 lg:px-20 text-center">
      <p style={{ fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#d3ba8b', marginBottom: '24px' }}>Ready to Go?</p>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, color: '#000000', marginBottom: '16px' }}>
        Let us plan your <em>perfect safari</em>
      </h2>
      <p style={{ fontSize: '15px', color: '#9D8070', marginBottom: '32px', fontWeight: 300 }}>
        Our Arusha-based team knows every park and trail. Get in touch today.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/booking" className="btn-primary">
          Start Planning <ArrowUpRight size={12} strokeWidth={1.5} />
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
