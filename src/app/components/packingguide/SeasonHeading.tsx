export default function SeasonHeading() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-16 pt-8 pb-10 text-center">
      <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 'clamp(30px, 3.4vw, 46px)', fontWeight: 600, color: '#6D6753', lineHeight: 1.15, marginBottom: '16px' }}>
        What to Pack, by Season
      </h2>
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753', opacity: 0.85, lineHeight: 1.8, maxWidth: '1100px', margin: '0 auto' }}>
        Tanzania's climate varies dramatically by season. Pack right and your safari will be effortless — pack wrong and the bush will remind you quickly.
      </p>
    </div>
  );
}
