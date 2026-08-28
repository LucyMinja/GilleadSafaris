import { seasonsDry } from './seasons-dry';
import { seasonsWet } from './seasons-wet';

// Site design tokens (see src/styles/theme.css) — kept here under the old
// name so every packingguide/* file didn't need a separate find-replace.
export const C = { gold: '#8D694B', dark: '#6D6753', green: '#8D694B', cream: '#F1EAE0' };
export const seasons = [...seasonsDry, ...seasonsWet];
export type Season = (typeof seasons)[number];

export function proTip(openCategory: number, seasonId: string) {
  if (openCategory === 0 && seasonId === 'dry-cool') return 'Layer up at 5am, peel down by 10am — earth tones over bright colours.';
  if (openCategory === 0 && seasonId === 'hot-dry') return 'Linen and cotton breathe far better than synthetics in 35°C heat.';
  if (openCategory === 0 && seasonId === 'long-rains') return 'Quick-dry fabrics earn their keep here — pack an extra shirt a day.';
  if (openCategory === 0 && seasonId === 'short-rains') return 'Pack for both — a warm sunny morning and a sudden afternoon downpour.';
  if (openCategory === 1) return 'Closed-toe shoes only — thorns and insects make sandals a poor choice on walks.';
  if (openCategory === 2) return 'Crater-rim altitude means stronger UV than sea level — reapply often.';
  if (openCategory === 3) return '8×42 binoculars are the sweet spot for distant game and low dawn light.';
  if (openCategory === 4) return 'Start malaria prophylaxis 1–2 weeks before you fly.';
  return '';
}
