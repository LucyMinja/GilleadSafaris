import Hero from './home/Hero';
import About from './home/About';
import WhatWeOffer from './home/WhatWeOffer';
import Destinations from './home/Destinations';
import SafarisGrid from './home/SafarisGrid';
import Culture from './home/Culture';
import GuestStories from './home/GuestStories';
import CTA from './home/CTA';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#F1EAE0' }}>
      <Hero />
      <About />
      <WhatWeOffer />
      <Destinations />
      <SafarisGrid />
      <Culture />
      <GuestStories />
      <CTA />
    </main>
  );
}
