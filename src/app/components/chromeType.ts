import type { CSSProperties } from 'react';

// Shared type scale for the site chrome — navbar, dropdowns, side menu and
// footer. These used to hand-set eight different sizes (8px–16px) with
// different tracking; every piece of chrome text now uses one of these, so
// change a size here and it updates everywhere.

const SANS = "'Plus Jakarta Sans', sans-serif";

// Main uppercase labels: navbar links, dropdown triggers, "Plan your safari", "Menu".
export const navLabel: CSSProperties = {
  fontFamily: SANS,
  fontSize: '13px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

// Smaller uppercase labels: footer column headings, "View all …", side-menu CTA.
export const subLabel: CSSProperties = {
  fontFamily: SANS,
  fontSize: '12px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
};

// Regular links and short text: dropdown items, side-menu sub-links, footer
// links, footer blurb and contact details.
export const chromeLink: CSSProperties = {
  fontFamily: SANS,
  fontSize: '14px',
  lineHeight: 1.7,
  fontWeight: 400,
};

// Fine print: footer bottom bar, address line, side-menu contact line.
export const chromeSmall: CSSProperties = {
  fontFamily: SANS,
  fontSize: '12px',
  letterSpacing: '0.04em',
  fontWeight: 400,
};
