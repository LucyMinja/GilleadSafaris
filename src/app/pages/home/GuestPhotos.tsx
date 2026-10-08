import CoverImage from '@/app/components/CoverImage';

// One still photo beside the guest reviews — no overlapping second photo
// and no floating drift, which read as a template effect.
export default function GuestPhotos() {
  return (
    <div className="relative overflow-hidden" style={{ height: 'clamp(380px, 42vw, 540px)', borderRadius: '4px' }}>
      <CoverImage src="/images/956A2097.webp" alt="A lioness mid-yawn in the long grass" />
    </div>
  );
}
