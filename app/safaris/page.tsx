import { Suspense } from 'react';
import SafariTours from '@/app/pages/SafariTours';

export const metadata = {
  title: 'Safari Tours — Gillead Safaris Tanzania',
  description:
    'Browse tailor-made safari packages with Gillead Safaris — multi-day itineraries across Tanzania\'s national parks, built around what you actually want to see.',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SafariTours />
    </Suspense>
  );
}
