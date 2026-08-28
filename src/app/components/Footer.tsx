'use client';

import '@/styles/globals.css';
import { destinations, tours, quickLinks, legal } from './footer/data';
import BrandColumn from './footer/BrandColumn';
import LinkColumn from './footer/LinkColumn';
import BottomBar from './footer/BottomBar';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#6D6753', borderTop: '1px solid rgba(241,234,224,0.15)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <BrandColumn />
          <LinkColumn title="Explore" links={quickLinks} />
          <LinkColumn title="Destinations" links={destinations} />
          <LinkColumn title="Popular Tours" links={tours} alignTop />
          <LinkColumn title="Legal" links={legal} />
        </div>
      </div>

      <BottomBar />
    </footer>
  );
}
