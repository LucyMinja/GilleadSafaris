import CoverImage from '@/app/components/CoverImage';

// Two offset, framed photos — a magazine-spread collage rather than a
// full-bleed image (explicitly asked to avoid) or another carousel.
// Static here on purpose: the parent column in GuestStories is already
// scroll-scrubbed as a whole, so this doesn't need its own entrance too.
export default function GuestPhotos() {
  return (
    <div className="relative" style={{ height: 'clamp(420px, 46vw, 560px)' }}>
      <div
        className="absolute overflow-hidden"
        style={{ top: 0, left: 0, width: '76%', height: '82%', borderRadius: '4px', boxShadow: '0 24px 60px rgba(0,0,0,0.22)' }}
      >
        <CoverImage src="/images/956A2097.jpg" />
      </div>
      <div
        className="absolute overflow-hidden"
        style={{ bottom: 0, right: 0, width: '54%', height: '50%', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.28)', border: '6px solid #F1EAE0' }}
      >
        <CoverImage src="/images/nakupenda-beach.jpg" />
      </div>
    </div>
  );
}
