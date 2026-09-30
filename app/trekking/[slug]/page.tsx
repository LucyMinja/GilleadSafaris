import { notFound } from 'next/navigation';
import TourDetail from '@/app/pages/TourDetail';
import { toursIn } from '@/app/pages/safaritours/data';

const trekkingTours = toursIn('trekking');

export function generateStaticParams() {
  return trekkingTours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = trekkingTours.find((t) => t.slug === slug);
  if (!tour) return {};
  return {
    title: `${tour.name} — Gillead Safaris Tanzania`,
    description: tour.desc,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!trekkingTours.some((t) => t.slug === slug)) notFound();
  return <TourDetail slug={slug} />;
}
