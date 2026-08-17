import { C } from './data';

const notes = [
  { label: 'Luggage Allowance', text: 'Most charter flights within Tanzania allow 15kg of soft-sided luggage. Hard suitcases cannot fit in bush planes. We recommend a soft duffel bag.' },
  { label: 'Laundry Service', text: 'All Gillead partner camps offer laundry service (usually same-day). You can travel lighter than you think  5 days of clothes is enough for a 10-day safari.' },
  { label: 'What Not to Bring', text: 'Avoid camouflage clothing  it is illegal in some East African countries. Bright colours disturb wildlife. Leave your white sneakers at home.' },
];

export default function BottomNotes() {
  return (
    <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {notes.map(({ label, text }) => (
          <div key={label}>
            <p style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginBottom: '10px' }}>{label}</p>
            <p style={{ fontSize: '13px', color: 'rgba(238,238,238,0.4)', lineHeight: 1.8 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
