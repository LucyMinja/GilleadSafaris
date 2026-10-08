import { C } from './data';

const notes = [
  { label: 'Luggage Allowance', text: 'Bush flights cap luggage at 15kg, soft-sided only — no wheels or frames.' },
  { label: 'Laundry Service', text: 'Most camps offer same-day laundry — pack for 5 days, not 10.' },
  { label: 'What Not to Bring', text: 'No camouflage (illegal in parts of East Africa), no bright colours.' },
];

export default function BottomNotes() {
  return (
    <div className="mb-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {notes.map(({ label, text }) => (
          <div key={label}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>{label}</p>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', color: '#6D6753', opacity: 0.75, lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
