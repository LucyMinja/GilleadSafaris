import { Suspense } from 'react';
import Booking from '@/app/pages/Booking';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Booking />
    </Suspense>
  );
}
