import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LinkColumn({
  title,
  links,
  alignTop,
}: {
  title: string;
  links: { label: string; href: string }[];
  alignTop?: boolean;
}) {
  return (
    <div>
      <h4 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C9A97E', marginBottom: '20px' }}>
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="footer-link" style={{ fontSize: '13px', color: 'rgba(241,234,224,0.85)', display: 'flex', alignItems: alignTop ? 'flex-start' : 'center', gap: '6px', lineHeight: 1.5, transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#F1EAE0')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(241,234,224,0.85)')}>
              <ArrowRight size={11} className="footer-arrow" style={{ color: '#C9A97E', flexShrink: 0, marginTop: alignTop ? '3px' : 0 }} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
