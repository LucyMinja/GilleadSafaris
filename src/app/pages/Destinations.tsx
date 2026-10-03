'use client';

import PageHero from '@/app/components/PageHero';
import { destinations } from './destinations/data';
import DestinationRow from './destinations/DestinationRow';
import BottomCTA from './destinations/BottomCTA';

export default function Destinations() {
  return (
    <div style={{ backgroundColor: '#F1EAE0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <PageHero
        title="Every corner of Tanzania has its own story."
        subtitle="From the endless plains of the Serengeti to the spice-scented alleys of Stone Town — here's where our guides actually take people, and why."
        image="/images/px-acacia-sunset.jpg"
      />

      <div className="py-6 lg:py-10">
        <div className="flex flex-col">
          {destinations.map((dest, i) => (
            <DestinationRow key={dest.id} dest={dest} index={i} />
          ))}
        </div>
      </div>

      <BottomCTA />
    </div>
  );
}
