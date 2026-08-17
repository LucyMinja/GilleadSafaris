import { seasonsDry, C } from './seasons-dry';
import { seasonsWet } from './seasons-wet';

export { C };
export const seasons = [...seasonsDry, ...seasonsWet];
export type Season = (typeof seasons)[number];

export function proTip(openCategory: number, seasonId: string) {
  if (openCategory === 0 && seasonId === 'dry-cool') return 'Layering is key in the dry season. Start with thermals at 5am, peel down by 10am. Earth tones blend with the dust  avoid bright colours that spook wildlife.';
  if (openCategory === 0 && seasonId === 'hot-dry') return 'Natural fabrics (linen, cotton) breathe far better than synthetics in 35°C heat. Light colours reflect sun rather than absorbing it.';
  if (openCategory === 0 && seasonId === 'long-rains') return 'Quick-dry fabrics are worth every penny in the wet season. Pack one extra shirt per day  you\'ll need it.';
  if (openCategory === 0 && seasonId === 'short-rains') return 'The short rains are unpredictable. Pack for both scenarios  a warm sunny morning and a dramatic afternoon downpour.';
  if (openCategory === 1) return 'Closed-toe shoes are essential  thorns, roots, and insects make sandals a poor choice on bush walks. Your guides will notice.';
  if (openCategory === 2) return 'Altitude on the crater rim means UV is stronger than at sea level. One hour of unprotected skin in the Ngorongoro midday sun can result in serious burn.';
  if (openCategory === 3) return 'Binoculars transform game drives. The difference between 8× and 10× magnification is significant for distant predators. 42mm objective lens performs well in low dawn light.';
  if (openCategory === 4) return 'Begin malaria prophylaxis at least 1–2 weeks before travel. Consult a travel health clinic for the most current recommendations for Tanzania.';
  return '';
}
