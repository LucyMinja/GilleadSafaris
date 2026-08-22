import type { Photo } from './data';

// Tiles render immediately, with no scroll-triggered reveal — a 22-photo
// grid gating every tile behind an opacity animation that only fires once
// it scrolls into a narrow trigger margin proved unreliable on mobile (the
// whole grid was rendering as a blank gap), and a photo gallery's core
// content shouldn't be hidden behind an animation gate to begin with.
export default function PhotoGrid({
  photos,
  onSelect,
}: {
  photos: Photo[];
  onSelect: (p: Photo) => void;
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-6 lg:pt-8 pb-20 lg:pb-28">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-start" style={{ gridAutoFlow: 'dense' }}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`group relative cursor-pointer overflow-hidden ${photo.featured ? 'sm:col-span-2' : ''}`}
            style={{ borderRadius: '2px', aspectRatio: photo.featured ? '16 / 10' : '3 / 4' }}
            onClick={() => onSelect(photo)}
          >
            <img
              src={photo.img}
              alt={photo.caption}
              loading="lazy"
              className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundColor: '#8D694B' }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)' }} />
            <p
              className="absolute bottom-3 left-4 right-4 pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', color: '#F1EAE0' }}
            >
              {photo.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
