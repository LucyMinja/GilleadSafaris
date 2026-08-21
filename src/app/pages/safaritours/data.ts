import { toursClassic } from './tours-classic';
import { toursMore } from './tours-more';

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

export const tours = [...toursClassic, ...toursMore];

export type Tour = (typeof tours)[number];

export const tourTypes = ['All', 'Classic', 'Cultural', 'Beach & Zanzibar', 'Migration', 'Day Trip'];
