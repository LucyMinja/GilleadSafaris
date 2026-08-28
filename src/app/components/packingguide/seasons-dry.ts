export const C = { gold: '#DF9307', dark: '#3D2210', green: '#9D7354', cream: '#F5EDE0' };

export const seasonsDry = [
  {
    id: 'dry-cool',
    label: 'Long Dry Season',
    months: 'June – October',
    badge: 'Peak Safari',
    badgeColor: C.gold,
    facts: ['8–15°C mornings', 'Zero rainfall', 'Mara river crossings', 'Black rhino sightings'],
    categories: [
      {
        title: 'Clothing',
        items: ['Thermal base layer', 'Fleece or light down jacket', '3–4 long-sleeve shirts', '2–3 zip-off trousers', 'Shorts', 'Wide-brim hat', 'Buff or neck gaiter', 'Windproof jacket'],
      },
      {
        title: 'Footwear',
        items: ['Sturdy closed-toe shoes', 'Camp sandals', 'Warm socks'],
      },
      {
        title: 'Sun & Skin',
        items: ['SPF 50+ sunscreen', 'Wraparound sunglasses', 'SPF lip balm', 'Moisturiser'],
      },
      {
        title: 'Safari Essentials',
        items: ['Binoculars (8×42)', 'Camera + spare batteries', 'Dust-proof bag', 'Small daypack', 'Headlamp', 'Reusable water bottle'],
      },
      {
        title: 'Health & Pharmacy',
        items: ['Malaria prophylaxis', 'DEET repellent 50%+', 'Altitude medication', 'Antihistamine', 'Blister plasters', 'Hand sanitiser'],
      },
    ],
  },
  {
    id: 'hot-dry',
    label: 'Short Dry Season',
    months: 'January – February',
    badge: 'Calving Season',
    badgeColor: '#8A694F',
    facts: ['30–35°C, dry heat', 'Wildebeest calving', '500k calves in 3 weeks', 'Fewer tourists'],
    categories: [
      {
        title: 'Clothing',
        items: ['Breathable linen shirts', 'Loose cotton trousers', 'Shorts', 'Wide-brim hat', 'Light sun scarf', 'Swimwear', 'Smart-casual outfit'],
      },
      {
        title: 'Footwear',
        items: ['Breathable mesh shoes', 'Sandals', 'Flip flops'],
      },
      {
        title: 'Sun & Skin',
        items: ['SPF 50+ sunscreen', 'After-sun or aloe gel', 'UV sunglasses', 'Cooling face mist', 'Electrolyte sachets'],
      },
      {
        title: 'Safari Essentials',
        items: ['Binoculars', 'Zoom-lens camera (200–400mm)', 'Cooling camera bag', 'Extra memory cards', 'Water bottle (2L+)'],
      },
      {
        title: 'Health & Pharmacy',
        items: ['Malaria prophylaxis', 'DEET repellent', 'Oral rehydration salts', 'Heat rash cream', 'Sunstroke treatment'],
      },
    ],
  },
];
