import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

// primary   — solid brown, for light backgrounds
// secondary — brown outline, for light backgrounds
// light     — white text + tan outline, for dark backgrounds (navbar, hero, footer)
type Variant = 'primary' | 'secondary' | 'light';
type Size = 'md' | 'sm';

const BROWN = '#8D694B';
const BROWN_DARK = '#71543A';
const TAN = '#C9A97E';

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center',
  borderRadius: '2px',
  padding: 'clamp(12px, 3vw, 15px) clamp(18px, 5vw, 32px)',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 'clamp(11px, 3vw, 13px)',
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
  light: { backgroundColor: 'transparent', color: '#ffffff', border: `1.5px solid ${TAN}` },
};

// sm — compact version for tight spots like the navbar.
const sizeStyle: Record<Size, React.CSSProperties> = {
  md: {},
  sm: { padding: '10px 20px', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600 },
};

const idleBorder: Record<Variant, string> = { primary: BROWN, secondary: BROWN, light: TAN };

const hoverStyle: Record<Variant, Partial<CSSStyleDeclaration>> = {
  primary: { backgroundColor: BROWN_DARK, borderColor: BROWN_DARK, transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(113,84,58,0.35)' },
  secondary: { backgroundColor: BROWN, color: '#ffffff' },
  light: { backgroundColor: BROWN, borderColor: BROWN, color: '#ffffff' },
};

function applyHover(e: MouseEvent<HTMLElement>, variant: Variant) {
  Object.assign(e.currentTarget.style, hoverStyle[variant]);
}

function clearHover(e: MouseEvent<HTMLElement>, variant: Variant) {
  e.currentTarget.style.backgroundColor = idleStyle[variant].backgroundColor as string;
  e.currentTarget.style.color = idleStyle[variant].color as string;
  e.currentTarget.style.borderColor = idleBorder[variant];
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = 'none';
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ActionButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type SafariButtonProps = LinkButtonProps | ActionButtonProps;

// Single shared button — boxed corners (never pill/rounded), three variants and two sizes.
// Use everywhere a CTA is needed instead of one-off inline-styled links or buttons.
export default function SafariButton({ variant = 'primary', size = 'md', children, style, ...props }: SafariButtonProps) {
  const combinedStyle = { ...base, ...idleStyle[variant], ...sizeStyle[size], ...style };

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
