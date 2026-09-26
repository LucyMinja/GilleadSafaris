import { Shirt, Sun, Binoculars, Pill, CloudRain, CloudSun, Package } from 'lucide-react';
import type { Season } from './data';

const ICONS: Record<string, typeof Shirt> = {
  'Clothing & Footwear': Shirt,
  'Sun & Skin': Sun,
  'Safari Essentials': Binoculars,
  'Health & Pharmacy': Pill,
  'Wet Weather Gear': CloudRain,
  'Sun & Rain': CloudSun,
};

export default function CategoryGrid({ season }: { season: Season }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
      {season.categories.map((cat) => {
        const Icon = ICONS[cat.title] ?? Package;
        return (
          <div key={cat.title}>
            <div className="flex items-center gap-2.5 mb-3.5">
              <Icon size={17} strokeWidth={1.5} color="#8D694B" />
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#6D6753' }}>
                {cat.title}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {cat.items.map((item) => (
                <div key={item} className="flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', color: '#6D6753', opacity: 0.85 }}>
                  <div style={{ width: '4px', height: '4px', backgroundColor: '#8D694B', borderRadius: '50%', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
