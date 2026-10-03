import { tours } from '../safaritours/data';

// Derived from the real tour data instead of a separately-maintained list —
// this used to be its own hand-typed array that had drifted from the real
// tours (wrong placeholder images, no shared ids), so a tour a visitor was
// just looking at on its own detail page had no way to carry through to
// this step. Using `tour.slug` as the id here means a link can now pass
// `?tour=<slug>` and this step recognizes it directly.
export const safariOptions = [
  ...tours.map((t) => ({ id: t.slug, name: t.name, duration: t.duration, price: t.price, img: t.img })),
  {
    id: 'custom',
    name: 'Custom / Bespoke Safari',
    duration: 'You choose',
    price: 'Get a quote',
    img: '/images/956A2160.webp',
    desc: "Not seeing what you're after? Pick this, tell us your dates and group size, and add your ideas in the special requests box — our team will design and price an itinerary just for you.",
  },
];
