import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary';

const BROWN = '#8D694B';
const BROWN_DARK = '#71543A';

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  borderRadius: '2px',
  padding: '15px 32px',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
  textDecoration: 'none',
};

const idleStyle: Record<Variant, React.CSSProperties> = {
  primary: { backgroundColor: BROWN, color: '#ffffff', border: `1.5px solid ${BROWN}`, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  secondary: { backgroundColor: 'transparent', color: BROWN, border: `1.5px solid ${BROWN}` },
};

const hoverStyle: Record<Variant, Partial<CSSStyleDeclaration>> = {
  primary: { backgroundColor: BROWN_DARK, borderColor: BROWN_DARK, transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(113,84,58,0.35)' },
  secondary: { backgroundColor: BROWN, color: '#ffffff' },
};

function applyHover(e: MouseEvent<HTMLElement>, variant: Variant) {
  Object.assign(e.currentTarget.style, hoverStyle[variant]);
}

function clearHover(e: MouseEvent<HTMLElement>, variant: Variant) {
  e.currentTarget.style.backgroundColor = idleStyle[variant].backgroundColor as string;
  e.currentTarget.style.color = idleStyle[variant].color as string;
  e.currentTarget.style.borderColor = BROWN;
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = 'none';
}

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ActionButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type SafariButtonProps = LinkButtonProps | ActionButtonProps;

// Single shared button — boxed corners, two variants (solid / outline).
// Use everywhere a CTA is needed instead of one-off inline-styled links or buttons.
export default function SafariButton({ variant = 'primary', children, style, ...props }: SafariButtonProps) {
  const combinedStyle = { ...base, ...idleStyle[variant], ...style };

  if ('href' in props && props.href) {
    const { href, className, ...rest } = props as LinkButtonProps;
    return (
      <Link
        href={href}
        className={className}
        style={combinedStyle}
        onMouseEnter={e => applyHover(e, variant)}
        onMouseLeave={e => clearHover(e, variant)}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
        onMouseUp={e => applyHover(e, variant)}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { className, ...rest } = props as ActionButtonProps;
  return (
    <button
      className={className}
      style={combinedStyle}
      onMouseEnter={e => applyHover(e, variant)}
      onMouseLeave={e => clearHover(e, variant)}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
      onMouseUp={e => applyHover(e, variant)}
      {...rest}
    >
      {children}
    </button>
  );
}
