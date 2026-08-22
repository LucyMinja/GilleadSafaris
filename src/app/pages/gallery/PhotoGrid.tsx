import RevealOnView from '@/app/pages/home/RevealOnView';
import type { Photo } from './data';

export default function PhotoGrid({
  photos,
  onSelect,
}: {
  photos: Photo[];
  onSelect: (p: Photo) => void;
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-10 lg:pt-12 pb-20 lg:pb-28">
      {/* items-start matters here, not just visually: CSS Grid's default
          align-items:stretch forces every item to fill its row's full
          height — and since `dense` packing reshuffles which tiles land
          in the same row, a tile's aspect-ratio was getting silently
          overridden by whatever tall neighbor it happened to land next
          to, making supposedly-identical tiles render at different
          proportions row to row. items-start lets each tile keep its own
          intrinsic aspect-ratio regardless of its row-mates. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-start" style={{ gridAutoFlow: 'dense' }}>
        {photos.map((photo, i) => (
          <RevealOnView
            key={photo.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            duration={0.5}
            delay={(i % 8) * 0.05}
            once
            margin="-40px"
            className={photo.featured ? 'sm:col-span-2' : ''}
          >
            <div
              className="group relative cursor-pointer overflow-hidden"
              style={{ borderRadius: '2px', aspectRatio: photo.featured ? '16 / 10' : '3 / 4' }}
              onClick={() => onSelect(photo)}
            >
              <img
                src={photo.img}
                alt={photo.caption}
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
          </RevealOnView>
        ))}
      </div>
    </div>
  );
}
