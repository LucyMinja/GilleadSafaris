import PageHero from '@/app/components/PageHero';

// Same hero as every other page (font, position, subtitle, animation) —
// only the photo and words are the homepage's own.
export default function Hero() {
  return (
    <PageHero
      title={'Where the wild\nstill sets the pace.'}
      subtitle="Private safaris, Kilimanjaro climbs and Zanzibar escapes, planned by a Tanzanian team in Arusha."
      image="/images/px-misty-giraffe.jpg"
      imagePosition="center 28%"
    />
  );
}
