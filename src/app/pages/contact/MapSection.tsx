export default function MapSection() {
  return (
    <section className="h-96 bg-white relative overflow-hidden">
      <iframe
        title="Arusha Tanzania Map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=36.58,-3.40,36.74,-3.32&layer=mapnik&marker=-3.3869,36.6820"
        className="w-full h-full border-0"
        style={{ filter: 'invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)' }}
      />
      <div className="absolute inset-0 pointer-events-none border-t border-[#d3ba8b]/20" />
    </section>
  );
}
