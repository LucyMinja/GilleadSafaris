import { LegalSection } from '@/app/components/LegalPageLayout';

export default function SectionsPartOne() {
  return (
    <>
      <LegalSection title="1. About These Terms">
        <p>
          These Terms &amp; Conditions ("Terms") govern all bookings made with <strong>Gillead Safaris Tanzania
          Ltd</strong> ("Gillead Safaris", "we", "us", "our"), a tour operator licensed to operate in the
          United Republic of Tanzania in accordance with the <strong>Tourism Act, 2008</strong> and its
          regulations, and registered with the Tanzania Tourist Licensing Authority. By making a booking,
          paying a deposit, or using our website, you ("the Client", "you") agree to be bound by these Terms.
        </p>
      </LegalSection>

      <LegalSection title="2. Bookings &amp; Confirmation">
        <ul>
          <li>A booking is only confirmed once we issue a written confirmation and receive the required deposit.</li>
          <li>The person making the booking confirms that they are authorised to do so on behalf of all travellers in the party and that all information provided (names as per passport, ages, nationalities, health information) is accurate.</li>
          <li>Itineraries are subject to availability of accommodation, park permits, flights, and vehicles at the time of confirmation, and may be adjusted slightly where original arrangements become unavailable, with an equivalent or better alternative offered where possible.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Payment Terms">
        <ul>
          <li>A nonrefundable deposit of <strong>30% of the total tour cost</strong> (or as otherwise agreed in writing) is required to confirm a booking.</li>
          <li>The remaining balance is due no later than <strong>45 days before the start date</strong> of your safari, unless a different schedule is agreed in writing.</li>
          <li>For bookings made within 45 days of departure, full payment is required at the time of booking.</li>
          <li>Payments can be made via bank transfer, major credit cards, or other methods agreed with our team. Bank charges and currency conversion fees are the responsibility of the Client.</li>
          <li>Failure to pay the balance by the due date may result in cancellation of the booking and forfeiture of the deposit.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Cancellations by the Client">
        <p>Cancellations must be made in writing (email is acceptable). The following cancellation charges apply, calculated from the date we receive written notice to the start date of the safari:</p>
        <ul>
          <li><strong>45 days or more before departure:</strong> loss of deposit only.</li>
          <li><strong>30–44 days before departure:</strong> 50% of the total tour cost.</li>
          <li><strong>15–29 days before departure:</strong> 75% of the total tour cost.</li>
          <li><strong>Less than 15 days before departure, or noshow:</strong> 100% of the total tour cost.</li>
        </ul>
        <p>
          Some thirdparty services including scheduled domestic flights, specialevent accommodation (e.g.
          during the Wildebeest Migration, peak Christmas/New Year, or Zanzibar high season), and Kilimanjaro
          climb permits  may carry stricter, nonrefundable cancellation terms imposed by the supplier. Where
          this applies, we will inform you at the time of booking.
        </p>
      </LegalSection>

      <LegalSection title="5. Cancellations or Changes by Gillead Safaris">
        <p>
          We will make every reasonable effort to operate all itineraries as confirmed. However, we reserve
          the right to modify or cancel a booking due to circumstances beyond our control (see Section 9,
          Force Majeure), insufficient minimum group numbers for group departures, or government/park
          authority restrictions. In such cases, we will offer an alternative itinerary of comparable value or
          a full refund of amounts paid for the affected services.
        </p>
      </LegalSection>

      <LegalSection title="6. Travel Documents, Visas &amp; Health Requirements">
        <ul>
          <li>It is the Client's sole responsibility to ensure they hold a valid passport (with at least six months' validity beyond the travel dates), any required Tanzania visa or evisa, and any onward travel documentation. We are happy to advise but are not liable for denied entry due to incomplete documentation.</li>
          <li>A <strong>Yellow Fever vaccination certificate</strong> may be required for entry into Tanzania for travellers arriving from, or having transited through, countries with risk of yellow fever transmission, in line with Tanzania Ministry of Health and International Health Regulations requirements.</li>
          <li>We strongly recommend taking malaria prophylaxis as advised by a travel health professional and obtaining comprehensive travel insurance covering medical evacuation, trip cancellation, and personal belongings before departure.</li>
          <li>Clients must disclose any preexisting medical conditions, mobility restrictions, or special requirements at the time of booking so that we can plan accordingly.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Conduct, Safety &amp; Park Regulations">
        <p>
          Safaris take place in national parks, conservation areas, and other wild environments governed by
          the rules of the relevant authorities, including TANAPA, the Ngorongoro Conservation Area Authority,
          and the Zanzibar Department of Tourism. Clients must follow the instructions of their guide and park
          rangers at all times, including rules on vehicle offroad driving, distance from wildlife, noise, and
          litter. Failure to comply may result in removal from the activity without refund, and the Client may
          be held liable for any fines imposed by the relevant authority.
        </p>
      </LegalSection>
    </>
  );
}
