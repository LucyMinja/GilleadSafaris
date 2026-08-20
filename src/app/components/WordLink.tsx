import type { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BROWN = '#8D694B';

// Single predefined "word link" pattern — a text link with a horizontal
// arrow, used anywhere a CTA doesn't need full button weight (a secondary
// "read more" next to a primary SafariButton, an in-text link, etc). Call
// it once, get the same look/animation everywhere: an underline that's
// always faintly visible (never truly invisible at rest) and draws in
// solid on hover, plus the arrow nudging right — not diagonal.
const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: BROWN,
  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
};

const underlineIdle: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  bottom: '-3px',
  width: '100%',
  height: '1.5px',
  backgroundColor: BROWN,
  transform: 'scaleX(0.4)',
  transformOrigin: 'left',
  transition: 'transform 0.3s ease',
};

const underlineHover: React.CSSProperties = { transform: 'scaleX(1)' };

const arrowIdle: React.CSSProperties = { transition: 'transform 0.3s ease' };
const arrowHover: React.CSSProperties = { transform: 'translateX(4px)' };

type WordLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function WordLink({ href, children, className, ...rest }: WordLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      style={base}
      onMouseEnter={e => {
        const underline = e.currentTarget.querySelector<HTMLElement>('[data-wordlink-underline]');
        const arrow = e.currentTarget.querySelector<HTMLElement>('[data-wordlink-arrow]');
        if (underline) Object.assign(underline.style, underlineHover);
        if (arrow) Object.assign(arrow.style, arrowHover);
      }}
      onMouseLeave={e => {
        const underline = e.currentTarget.querySelector<HTMLElement>('[data-wordlink-underline]');
        const arrow = e.currentTarget.querySelector<HTMLElement>('[data-wordlink-arrow]');
        if (underline) underline.style.transform = 'scaleX(0.4)';
        if (arrow) arrow.style.transform = 'translateX(0)';
      }}
      {...rest}
    >
      <span style={{ position: 'relative' }}>
        {children}
        <span data-wordlink-underline style={underlineIdle} />
      </span>
      <ArrowRight data-wordlink-arrow size={13} strokeWidth={2} style={arrowIdle} />
    </Link>
  );
}
