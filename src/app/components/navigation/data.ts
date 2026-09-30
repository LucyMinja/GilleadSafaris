export interface NavLink {
  label: string;
  href: string;
  desktopNav?: boolean;
  subLinks?: { label: string; href: string; description?: string }[];
}

export const menuLinks: NavLink[] = [
  {
    label: 'Destinations',
    href: '/destinations',
    desktopNav: true,
    subLinks: [
      { label: 'Serengeti National Park', href: '/destinations/serengeti', description: 'Endless plains and the Great Migration' },
      { label: 'Ngorongoro Crater', href: '/destinations/ngorongoro', description: 'World\'s largest intact volcanic caldera' },
      { label: 'Tarangire National Park', href: '/destinations/tarangire', description: 'The land of giants and baobabs' },
      { label: 'Lake Manyara National Park', href: '/destinations/manyara', description: 'Tree-climbing lions and flamingo shores' },
      { label: 'Ruaha National Park', href: '/destinations/ruaha', description: 'Remote, wild and uncrowded in the south' },
      { label: 'View All Destinations', href: '/destinations' },
    ]
  },
  {
    label: 'Safaris',
    href: '/safaris',
    desktopNav: true,
    subLinks: [
      { label: '1 Day Ngorongoro Crater', href: '/safaris/ngorongoro-crater-day-trip', description: 'Quick escape to a wildlife sanctuary' },
      { label: '3 Days Classic Serengeti', href: '/safaris/classic-serengeti-3-days', description: 'A perfect introduction to safari country' },
      { label: '5 Days Northern Circuit', href: '/safaris/northern-safari-5-days', description: 'Tanzania\'s highlight parks in one circuit' },
      { label: '6 Days Best of Tanzania', href: '/safaris/best-of-tanzania-6-days', description: 'Our fan-favourite comprehensive safari' },
      { label: '8 Days Wildebeest Migration', href: '/safaris/wildebeest-migration-8-days', description: 'Witness the dramatic river crossings' },
      { label: 'View All Safaris', href: '/safaris' },
    ]
  },
  {
    label: 'Trekking',
    href: '/trekking',
    desktopNav: true,
    subLinks: [
      { label: 'Kilimanjaro — Machame Route', href: '/trekking/kilimanjaro-machame-route-7-days', description: '7 days · the most scenic way up' },
      { label: 'Kilimanjaro — Lemosho Route', href: '/trekking/kilimanjaro-lemosho-route-8-days', description: '8 days · highest summit success' },
      { label: 'Kilimanjaro — Marangu Route', href: '/trekking/kilimanjaro-marangu-route-6-days', description: '6 days · sleep in mountain huts' },
      { label: 'Kilimanjaro — Rongai Route', href: '/trekking/kilimanjaro-rongai-route-7-days', description: '7 days · quiet northern approach' },
      { label: 'Mount Meru Climb', href: '/trekking/mount-meru-climb-4-days', description: '4 days · summit among giraffe & buffalo' },
      { label: 'Ol Doinyo Lengai & Lake Natron', href: '/trekking/ol-doinyo-lengai-lake-natron-3-days', description: '3 days · night climb on an active volcano' },
      { label: 'Kilimanjaro Day Hike', href: '/trekking/kilimanjaro-day-hike', description: '1 day · rainforest to Mandara Hut' },
      { label: 'View All Treks', href: '/trekking' },
    ]
  },
  {
    label: 'Beach',
    href: '/beach',
    desktopNav: true,
    subLinks: [
      { label: 'Zanzibar Beach Holiday', href: '/beach/zanzibar-beach-holiday-6-days', description: '6 days · Stone Town, Jozani & Paje' },
      { label: 'Kendwa Beach & Stone Town', href: '/beach/zanzibar-kendwa-stone-town-4-days', description: '4 days · history and white sand' },
      { label: 'Safari & Zanzibar', href: '/beach/safari-and-zanzibar-10-days', description: '10 days · Serengeti, then the sea' },
      { label: 'Mnemba Atoll Snorkelling', href: '/beach/mnemba-atoll-snorkelling-day-trip', description: '1 day · turtles and dolphins' },
      { label: 'Stone Town & Prison Island', href: '/beach/stone-town-prison-island-day-trip', description: '1 day · giant tortoises & sandbank' },
      { label: 'Mafia Island Whale Sharks', href: '/beach/mafia-island-whale-sharks-4-days', description: '4 days · Oct–Mar, marine park' },
      { label: 'Pemba Island Escape', href: '/beach/pemba-island-escape-5-days', description: '5 days · the untouched green island' },
      { label: 'View All Beach Holidays', href: '/beach' },
    ]
  },
  {
    label: 'Accommodation',
    href: '/accommodation',
    desktopNav: false,
    subLinks: [
      { label: 'Kuona Serengeti Lodge', href: '/accommodation?id=7', description: 'Built into ancient kopjes in the Serengeti' },
      { label: 'Serengeti Pioneer Camp', href: '/accommodation?id=1', description: '1930s explorer tents above the Moru Kopjes' },
      { label: 'Ngorongoro Serena Safari Lodge', href: '/accommodation?id=2', description: 'Stone rooms on the crater rim' },
      { label: 'Zuri Zanzibar', href: '/accommodation?id=3', description: 'Villas on Kendwa Beach' },
      { label: 'Tarangire Treetops', href: '/accommodation?id=4', description: 'Treehouse rooms among the baobabs' },
      { label: 'Ruaha River Lodge', href: '/accommodation?id=5', description: 'Stone chalets on the Great Ruaha River' },
      { label: 'Sand Rivers Selous', href: '/accommodation?id=6', description: 'Walking and boat safaris on the Rufiji' },
      { label: 'Kutoka Lodge', href: '/accommodation?id=8', description: 'Garden lodge on the edge of Arusha' },
      { label: 'View All Accommodations', href: '/accommodation' },
    ]
  },
  { label: 'About', href: '/about', desktopNav: true },
  { label: 'Gallery', href: '/gallery', desktopNav: true },
  { label: 'Heritage', href: '/culture', desktopNav: true },
  { label: 'Contact', href: '/contact', desktopNav: true },
  { label: 'Travel Essentials', href: '/essentials', desktopNav: false },
  { label: 'Sustainability', href: '/sustainability', desktopNav: false },
];

export const desktopLinks = menuLinks.filter(link => link.desktopNav);
