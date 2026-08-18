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
}: {
  src: string;
  alt: string;
  paused: boolean;
  zoomIn: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 ${zoomIn ? 'ken-burns-alt' : 'ken-burns'}`}
      style={{ animationDuration: '4.5s', animationPlayState: paused ? 'paused' : 'running' }}
    >
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})`, backgroundColor: '#8a694f' }}
      />
    </div>
  );
}
