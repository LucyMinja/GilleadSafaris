export default function MapSection() {
  return (
    // A fixed-height parent + `iframe height:100%` leaves a one-frame window
    // where the browser can paint the iframe at its native default size
    // before percentage sizing resolves — since this is a cross-origin
    // OpenStreetMap embed, its internal Leaflet map reads that size once at
    // load and we can't reach in afterward to tell it to resize. An
    // aspect-ratio box gets its final pixel size in the very first layout
    // pass (pure CSS, no percentage timing), so the iframe is never
    // painted at the wrong size to begin with.
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 1', minHeight: '320px', backgroundColor: '#F1EAE0' }}>
      <iframe
        title="Arusha Tanzania Map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=36.58,-3.40,36.74,-3.32&layer=mapnik&marker=-3.3869,36.6820"
        className="absolute inset-0 w-full h-full border-0"
        style={{ filter: 'invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ borderTop: '1px solid rgba(141,105,75,0.2)' }} />
    </section>
  );
}
