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
      { label: 'Zanzibar Archipelago', href: '/destinations/zanzibar', description: 'Pristine beaches and historic Stone Town' },
      { label: 'Mount Kilimanjaro', href: '/destinations/kilimanjaro', description: 'The roof of Africa' },
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
    label: 'Accommodation',
    href: '/accommodation',
    desktopNav: true,
    subLinks: [
      { label: 'Kuona Serengeti Lodge', href: '/accommodation?id=7', description: 'Built into ancient kopjes in the Serengeti' },
      { label: 'Serengeti Horizon Camp', href: '/accommodation?id=1', description: 'Luxury tents closest to the migration routes' },
      { label: 'Crater Highlands Lodge', href: '/accommodation?id=2', description: 'Perched precisely on the Ngorongoro rim' },
      { label: 'Zanzibar Coral Beach', href: '/accommodation?id=3', description: 'Private oceanfront villas on the north coast' },
      { label: 'Tarangire Baobab Retreat', href: '/accommodation?id=4', description: 'Elevated luxury rooms set among the giant trees' },
      { label: 'View All Accommodations', href: '/accommodation' },
    ]
  },
  { label: 'About', href: '/about', desktopNav: true },
  { label: 'Gallery', href: '/gallery', desktopNav: true },
  { label: 'Heritage', href: '/culture', desktopNav: true },
  { label: 'Book a Safari', href: '/booking', desktopNav: false },
  { label: 'Contact', href: '/contact', desktopNav: true },
  { label: 'Travel Essentials', href: '/essentials', desktopNav: false },
  { label: 'Sustainability', href: '/sustainability', desktopNav: false },
];

export const desktopLinks = menuLinks.filter(link => link.desktopNav);
