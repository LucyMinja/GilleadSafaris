import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { subLabel, chromeLink } from '../chromeType';

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
      <h4 style={{ ...subLabel, color: '#C9A97E', marginBottom: '20px' }}>
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="footer-link" style={{ ...chromeLink, color: '#FFFFFF', display: 'flex', alignItems: alignTop ? 'flex-start' : 'center', gap: '6px', lineHeight: 1.5, transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#C9A97E')}
              onMouseOut={e => (e.currentTarget.style.color = '#FFFFFF')}>
              <ArrowRight size={11} className="footer-arrow" style={{ color: '#C9A97E', flexShrink: 0, marginTop: alignTop ? '3px' : 0 }} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
