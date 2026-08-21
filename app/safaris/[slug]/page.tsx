import { notFound } from 'next/navigation';
import TourDetail from '@/app/pages/TourDetail';
import { tours } from '@/app/pages/safaritours/data';

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return {};
  return {
    title: `${tour.name} — Gillead Safaris Tanzania`,
    description: tour.desc,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) notFound();
  return <TourDetail slug={slug} />;
}
