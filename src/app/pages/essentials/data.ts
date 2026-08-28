export type FAQItem = { q: string; a: string };
export type Callout = { label: string; text: string; stat: string };

export type EssentialsSection = {
  id: string;
  kicker: string;
  title: string;
  img: string;
  items: FAQItem[];
  callout?: Callout;
  cta?: { label: string; href: string };
  reverse?: boolean;
};

// Facts verified against current sources before writing (Aug 2026) — Tanzania
// abolished visa-on-arrival in January 2025, which a lot of older safari-site
// copy still gets wrong.
export const sections: EssentialsSection[] = [
  {
    id: 'seasons',
    kicker: 'When to Go',
    title: "Tanzania's Seasons",
    img: '/images/956A2546.webp',
    items: [
      {
        q: 'When is the best time to visit?',
        a: "Tanzania runs on two dry seasons and two wet ones, and the pattern holds across most of the country — parks and coast alike. June to October (the long dry season) is peak travel time nationwide: wildlife concentrates at water sources inland, and it's reliably sunny on the beaches. January–February is a shorter dry window with its own draw — in the Serengeti specifically, it's calving season, with excellent predator action and far fewer visitors. The rainy months (March–May, and lighter short rains Nov–Dec) mean lush scenery and lower rates everywhere, if you don't mind the occasional afternoon downpour.",
      },
      {
        q: 'What is the weather like?',
        a: 'It varies more by altitude than most people expect — a highland park and a Zanzibar beach on the same day can feel like different climates. Inland dry-season mornings on a 6am game drive can be 8–15°C, warming to the mid-20s by afternoon, while the coast stays warm year-round. The short dry season (Jan–Feb) is hot everywhere, 30–35°C. The rains bring cooler, humid days with heavy but usually brief afternoon showers.',
      },
    ],
  },
  {
    id: 'travel-requirements',
    kicker: 'Arrival Logistics',
    title: 'Travel Requirements',
    img: '/images/IMG_1073.webp',
    reverse: true,
    items: [
      {
        q: 'Do I need a visa to enter Tanzania?',
        a: 'Yes. Tanzania discontinued visa-on-arrival in January 2025 — visas are no longer issued at airports or borders. You need to apply for an e-Visa online in advance at the official government portal (visa.immigration.go.tz). Processing is typically around 10 business days, so apply well before you fly, not at the last minute.',
      },
      {
        q: 'Do I need a Yellow Fever certificate?',
        a: "Only if you're arriving from, or transiting more than 12 hours through, a country with yellow fever risk — this includes neighbouring Kenya and Uganda, which matters if your trip combines countries. Flying in directly from the US or most of Europe, it isn't required. Check against your full itinerary, not just your home country.",
      },
    ],
    callout: {
      label: 'Passport & Visa Compliance',
      text: 'Your passport must be valid for at least 6 months beyond your departure date and have at least one blank page for entry stamps.',
      stat: '6 MONTHS VALIDITY REQUIRED',
    },
  },
  {
    id: 'health',
    kicker: 'Your Protection',
    title: 'Health & Wellbeing',
    img: '/images/kutoka.jpeg',
    items: [
      {
        q: 'Do I need vaccinations or malaria medication?',
        a: 'Malaria risk exists across the classic northern circuit — Serengeti, Tarangire, and Lake Manyara all sit at altitudes where the risk is present — so antimalarials are generally recommended. Routine vaccines plus hepatitis A and typhoid are commonly advised for Tanzania too. Talk to a travel health clinic 4–6 weeks before you fly; requirements depend on your own health history and where else you\'re travelling.',
      },
      {
        q: 'Do I need travel insurance?',
        a: "We strongly recommend it, with emergency medical evacuation cover specifically. Medical care in remote parks is limited, and evacuation costs are significant — that's not something we're able to cover on your behalf. Arrange a policy that includes it before you travel, and bring your insurer's details with you.",
      },
    ],
  },
];
