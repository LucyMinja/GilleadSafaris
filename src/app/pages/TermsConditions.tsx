import { LegalHero, LegalPageWrapper, LegalSection } from '@/app/components/LegalPageLayout';

export default function TermsConditions() {
  return (
    <div>
      <LegalHero eyebrow="Legal" title="Terms &amp; Conditions" updated="10 June 2026" />

      <LegalPageWrapper>
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

        <LegalSection title="8. Liability">
          <p>
            Gillead Safaris acts as an agent in respect of services provided by third parties (including but not
            limited to airlines, lodges, camps, and ground transport providers) and as a principal in respect of
            services we directly operate (such as guided game drives using our own vehicles and staff). To the
            maximum extent permitted under the laws of Tanzania:
          </p>
          <ul>
            <li>We are not liable for any injury, loss, damage, delay, or inconvenience caused by thirdparty suppliers, acts of nature, wildlife, weather conditions, or circumstances beyond our reasonable control.</li>
            <li>Our liability for any claim arising from services we directly provide shall not exceed the total amount paid by the Client for the relevant portion of the trip.</li>
            <li>Nothing in these Terms excludes liability for death or personal injury caused by our proven negligence, or any other liability that cannot be excluded under Tanzanian law.</li>
          </ul>
        </LegalSection>

        <LegalSection title="9. Force Majeure">
          <p>
            Neither party shall be liable for any failure or delay in performance under these Terms which is due
            to causes beyond its reasonable control, including but not limited to natural disasters, extreme
            weather, fire, epidemic or pandemic, war, civil unrest, strikes, government action, closure of
            national parks or borders, or failure of public infrastructure. Where such an event affects your
            safari, we will work with you in good faith to reschedule, provide alternative arrangements, or issue
            a credit/refund for unused services, less any costs already incurred or nonrecoverable from third
            parties.
          </p>
        </LegalSection>

        <LegalSection title="10. Photography, Media &amp; Marketing">
          <p>
            From time to time, our guides or staff may take photographs or videos during tours for marketing
            purposes. By travelling with us, you consent to appearing in such material unless you notify us in
            writing prior to or during your trip that you do not wish to be photographed or featured.
          </p>
        </LegalSection>

        <LegalSection title="11. Complaints">
          <p>
            If you have a concern during your safari, please raise it immediately with your guide or our office
            so we can attempt to resolve it on the spot. If the issue remains unresolved, please submit a written
            complaint to <a href="mailto:info@gillieadsafaris.com">info@gillieadsafaris.com</a> within 30 days of
            the end of your trip, and we will investigate and respond within a reasonable time.
          </p>
        </LegalSection>

        <LegalSection title="12. Governing Law &amp; Jurisdiction">
          <p>
            These Terms are governed by and construed in accordance with the laws of the <strong>United Republic
            of Tanzania</strong>. Any dispute arising out of or in connection with these Terms or a booking with
            Gillead Safaris shall first be addressed through goodfaith negotiation, and failing resolution,
            shall be subject to the exclusive jurisdiction of the courts of Tanzania, sitting in Arusha, or
            resolved by arbitration in Tanzania in accordance with the Arbitration Act, where both parties agree
            to arbitration as an alternative.
          </p>
        </LegalSection>

        <LegalSection title="13. Changes to These Terms">
          <p>
            We may revise these Terms from time to time to reflect changes in our services, supplier policies,
            or legal requirements. The version of the Terms in effect at the time you make a booking will apply
            to that booking. The "Last updated" date at the top of this page indicates when these Terms were last
            revised.
          </p>
        </LegalSection>

        <LegalSection title="14. Contact Us">
          <ul>
            <li><strong>Gillead Safaris Tanzania Ltd</strong>  Arusha, Tanzania</li>
            <li>Phone: <a href="tel:+255753959375">+255 753 959 375</a></li>
            <li>Email: <a href="mailto:info@gillieadsafaris.com">info@gillieadsafaris.com</a></li>
          </ul>
        </LegalSection>
      </LegalPageWrapper>
    </div>
  );
}
