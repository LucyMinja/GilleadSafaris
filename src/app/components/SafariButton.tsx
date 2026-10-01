import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import Link from 'next/link';

// primary   — solid brown, for light backgrounds
// secondary — brown outline, for light backgrounds
// light     — white text + tan outline, for dark backgrounds (navbar, hero, footer, cookie banner)
type Variant = 'primary' | 'secondary' | 'light';
type Size = 'md' | 'sm';

const BROWN = '#8D694B';
const BROWN_DARK = '#71543A';
const TAN = '#C9A97E';

const base: CSSProperties = {
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
  textDecoration: 'none',
};

// Idle look + the hover values the `.safari-btn` CSS (styles/globals.css)
// reads: --sb-fill sweeps in from the left, then text/border switch to
// --sb-fg-hover / --sb-border-hover. Any arrow icon inside nudges right.
const variantStyle: Record<Variant, CSSProperties> = {
  primary: { backgroundColor: BROWN, color: '#ffffff', border: `1.5px solid ${BROWN}`, '--sb-fill': BROWN_DARK, '--sb-fg-hover': '#ffffff', '--sb-border-hover': BROWN_DARK } as CSSProperties,
  secondary: { backgroundColor: 'transparent', color: BROWN, border: `1.5px solid ${BROWN}`, '--sb-fill': BROWN, '--sb-fg-hover': '#ffffff', '--sb-border-hover': BROWN } as CSSProperties,
  light: { backgroundColor: 'transparent', color: '#ffffff', border: `1.5px solid ${TAN}`, '--sb-fill': BROWN, '--sb-fg-hover': '#ffffff', '--sb-border-hover': BROWN } as CSSProperties,
};

// sm — compact version for tight spots like the navbar or cookie banner.
const sizeStyle: Record<Size, CSSProperties> = {
  md: {},
  sm: { padding: '10px 20px', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600 },
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ActionButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type SafariButtonProps = LinkButtonProps | ActionButtonProps;

// Single shared button — boxed corners (never pill/rounded), three variants and two sizes.
// Use everywhere a CTA is needed instead of one-off inline-styled links or buttons.
export default function SafariButton({ variant = 'primary', size = 'md', children, style, className, ...props }: SafariButtonProps) {
  const combinedStyle = { ...base, ...variantStyle[variant], ...sizeStyle[size], ...style };
  const cls = ['safari-btn', className].filter(Boolean).join(' ');

  if ('href' in props && props.href) {
    const { href, ...rest } = props as LinkButtonProps;
    return (
      <Link href={href} className={cls} style={combinedStyle} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} style={combinedStyle} {...(props as ActionButtonProps)}>
      {children}
    </button>
  );
}
