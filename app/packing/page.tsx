import PackingGuide from '@/app/components/PackingGuide';

export const metadata = {
  title: 'What to Pack. Gillead Safaris Tanzania',
  description: 'Complete packing guide by season for your Tanzania safari. Know exactly what to bring for every time of year.',
};

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '100vh', minHeight: '600px' }}
      >
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&h=1080&fit=crop&auto=format)', backgroundColor: '#8a694f' }} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)' }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div style={{ width: '28px', height: '1px', backgroundColor: '#d3ba8b' }} />
            <span style={{ fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#d3ba8b', fontFamily: "'Lato', sans-serif" }}>
              Practical Preparation
            </span>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#d3ba8b' }} />
          </div>
          <h1
            style={{
              fontFamily: "'DM Serif Display', sans-serif",
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            What to Pack
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.85, color: 'rgba(255,255,255,0.72)', maxWidth: '520px', margin: '0 auto', fontFamily: "'Lato', sans-serif" }}>
            Tanzania's climate changes dramatically across the year. The right gear makes the difference between a magical safari and a miserable one.
          </p>
        </div>
      </section>

      <PackingGuide />
    </div>
  );
}
