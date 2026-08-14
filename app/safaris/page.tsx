import { Suspense } from 'react';
import SafariTours from '@/app/pages/SafariTours';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SafariTours />
    </Suspense>
  );
}
