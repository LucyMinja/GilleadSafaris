'use client';

import { chromeSmall } from '../chromeType';

const linkStyle: React.CSSProperties = {
  ...chromeSmall,
  color: '#FFFFFF',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
};

const fineprintStyle: React.CSSProperties = {
  ...chromeSmall,
  color: '#FFFFFF',
};

function onHoverIn(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.color = '#C9A97E';
}
function onHoverOut(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.color = '#FFFFFF';
}

const subject = 'Website Inquiry — Online Services';
const body = "Hi Minja,\n\nI came across a site you built and I'd like to talk about website or online services for my own project.\n\nHere's a bit about what I'm looking for:\n";
const mailtoHref = `mailto:lucyminja556@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export default function BottomBar() {
  return (
    <div style={{ borderTop: '1px solid rgba(241,234,224,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-6 pb-16 lg:pb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <p style={fineprintStyle}>
          © {new Date().getFullYear()} Gillead Safaris Tanzania Ltd. All rights reserved.
        </p>

        <p style={fineprintStyle}>Registered in Tanzania · TALA Licensed</p>

        <a href={mailtoHref} style={linkStyle} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
          Powered by Minja
        </a>
      </div>
    </div>
  );
}
