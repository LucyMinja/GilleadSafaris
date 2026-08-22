// Every photo here was viewed and confirmed before being added — the old
// version was 100% Unsplash stock, which defeats the point of a page whose
// whole job is showing this operator's real photography. Captions for
// images not individually re-verified in this pass stay generic
// (location/mood only) rather than claiming specific unconfirmed subjects.
export const photos = [
  { id: 1, img: '/images/956A3225.jpg', caption: 'Serengeti Plains' },
  { id: 2, img: '/images/956A4243.jpg', caption: 'Ngorongoro Crater' },
  { id: 3, img: '/images/IMG_2493.jpg', caption: 'Maasai Herder and Cattle' },
  { id: 4, img: '/images/956A3919.jpg', caption: 'Leopard in the Trees' },
  { id: 5, img: '/images/nakupenda-beach.jpg', caption: 'Zanzibar Coastline' },
  { id: 6, img: '/images/956A2874.jpg', caption: 'Lion Portrait', featured: true },
  { id: 7, img: '/images/IMG_0227.jpg', caption: 'Elephant Herd, Tarangire' },
  { id: 8, img: '/images/stone-town.jpg', caption: 'Stone Town, Zanzibar' },
  { id: 9, img: '/images/956A3425.jpg', caption: 'Wildebeest Herd' },
  { id: 10, img: '/images/956A3123.jpg', caption: 'Cheetahs at Rest' },
  { id: 11, img: '/images/prison.jpg', caption: 'An Island off Zanzibar', featured: true },
  { id: 12, img: '/images/956A2025.jpg', caption: 'Lioness on the Move' },
  { id: 13, img: '/images/IMG_1256.jpg', caption: 'On the Crater Rim' },
  { id: 14, img: '/images/Darajani_Market.jpg', caption: 'Darajani Market, Stone Town' },
  { id: 15, img: '/images/956A1651.jpg', caption: 'Warthogs Grazing' },
  { id: 16, img: '/images/956A4274.jpg', caption: 'The Great Migration', featured: true },
  { id: 17, img: '/images/956A3701.jpg', caption: 'Ostriches on the Plains' },
  { id: 18, img: '/images/IMG_1068.jpg', caption: 'Ready for the Road' },
  { id: 19, img: '/images/956A2358.jpg', caption: 'Serengeti Safari' },
  { id: 20, img: '/images/956A3309.jpg', caption: 'Northern Circuit' },
  { id: 21, img: '/images/956A2613.jpg', caption: 'Northern Tanzania' },
  { id: 22, img: '/images/956A3279.jpg', caption: 'Ngorongoro Crater Floor' },
];

export type Photo = (typeof photos)[number];
