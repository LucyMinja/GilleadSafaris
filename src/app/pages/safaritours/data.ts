import { toursClassic } from './tours-classic';
import { toursMore } from './tours-more';
import { toursTrekking } from './tours-trekking';
import { toursBeach } from './tours-beach';

export const standardIncludes = [
  'Park fees',
  'Conservation fees',
  'All activities (unless labeled as optional)',
  'All accommodation as stated in the itinerary',
  'A professional driver-guide',
  'All transportation (unless labeled as optional)',
  'All taxes & VAT',
  'Roundtrip airport transfers',
  'All meals as specified in the itinerary',
  'Drinking water on all days',
];

export const standardExcludes = [
  'International flights',
  'Tips for guides & staff (~US$20 pp/day guideline)',
  'Travel & medical insurance',
  'Personal expenses & souvenirs',
  'Tanzania visa fees',
  'Services not mentioned in the itinerary',
];

// Trekking/beach trips share the same shape and detail page as safaris, but
// get their own sections of the site — so a Kilimanjaro climb lives at
// /trekking/<slug> rather than /safaris/<slug>.
export const trekkingIncludes = [
  'Kilimanjaro/Meru park & rescue fees',
  'Certified mountain guide, assistant guides & porters',
  'Mountain tents, sleeping mats & dining tent (hut fees on Marangu)',
  'All meals on the mountain, cooked fresh by our chef',
  'Purified drinking water throughout the climb',
  'Emergency oxygen & first-aid kit, daily health checks',
  'Pre- and post-climb hotel transfers',
  'Summit certificate',
];

export const trekkingExcludes = [
  'International flights',
  'Tips for mountain crew (guideline given at briefing)',
  'Travel insurance covering altitude up to 6,000m',
  'Sleeping bag & personal gear (rental available)',
  'Tanzania visa fees',
  'Hotel nights before and after the climb',
];

export const tours = [...toursClassic, ...toursMore, ...toursTrekking, ...toursBeach];

export type Tour = (typeof tours)[number];

export type TourCategory = 'safaris' | 'trekking' | 'beach';

export function tourCategory(tour: Tour): TourCategory {
  if (tour.type === 'Trekking') return 'trekking';
  if (tour.type === 'Beach & Zanzibar') return 'beach';
  return 'safaris';
}

export const tourHref = (tour: Tour) => `/${tourCategory(tour)}/${tour.slug}`;

export const toursIn = (category: TourCategory) => tours.filter((t) => tourCategory(t) === category);

export const tourTypes = ['All', 'Luxury', 'Classic', 'Cultural', 'Beach & Zanzibar', 'Migration', 'Day Trip'];
