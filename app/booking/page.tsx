import { Suspense } from 'react';
import Booking from '@/app/pages/Booking';

export const metadata = {
  title: 'Book Your Safari — Gillead Safaris Tanzania',
  description: 'Book your tailor-made Tanzania safari with Gillead Safaris in a few simple steps.',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Booking />
    </Suspense>
  );
}
