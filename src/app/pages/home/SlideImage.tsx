import CoverImage from '@/app/components/CoverImage';

/* ── Images sit directly back-to-back — no fade, no gap where the
   background shows through. The slow Ken Burns zoom (native CSS, so
   hover-pausing freezes cleanly instead of retargeting mid-flight) is
   the only motion, restarting fresh each time a new image mounts.
   Direction alternates per slide (in → out → in → out) so consecutive
   slides don't repeat the same zoom. ── */
export default function SlideImage({
  src,
  alt,
  paused,
  zoomIn,
  priority,
}: {
  src: string;
  alt: string;
  paused: boolean;
  zoomIn: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 ${zoomIn ? 'ken-burns-alt' : 'ken-burns'}`}
      style={{ animationDuration: '4.5s', animationPlayState: paused ? 'paused' : 'running' }}
    >
      <CoverImage src={src} alt={alt} priority={priority} />
    </div>
  );
}
