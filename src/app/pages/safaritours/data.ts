import { toursClassic } from './tours-classic';
import { toursMore } from './tours-more';

export const standardIncludes = [
  'Park & conservation fees',
  'Professional driver-guide',
  'Private 4x4 safari vehicle',
  'All accommodation as listed',
  'All meals as specified',
  'Drinking water on all days',
  'Roundtrip airport transfers',
  'All taxes & VAT',
];

export const standardExcludes = [
  'International flights',
  'Tips for guides & staff',
  'Travel & medical insurance',
  'Personal expenses & souvenirs',
  'Tanzania visa fees',
];

export const tours = [...toursClassic, ...toursMore];

export type Tour = (typeof tours)[number];

export const tourTypes = ['All', 'Classic', 'Cultural', 'Beach & Zanzibar', 'Migration', 'Day Trip'];
