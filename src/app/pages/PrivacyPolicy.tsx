import { LegalHero, LegalPageWrapper, LegalSection } from '@/app/components/LegalPageLayout';

export default function PrivacyPolicy() {
  return (
    <div>
      <LegalHero title="Privacy Policy" updated="10 June 2026" />

      <LegalPageWrapper>
        <LegalSection title="1. Introduction">
          <p>
            Gillead Safaris Tanzania Ltd ("Gillead Safaris", "we", "us", or "our") is a registered tour operator
            based in Arusha, Tanzania. We respect your privacy and are committed to protecting the personal data
            you share with us when you visit our website, request a quote, make a booking, or otherwise
            communicate with us.
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use and store it, and the rights
            you have over your data. It is written to comply with the <strong>Tanzania Personal Data Protection
            Act, 2022</strong> and its accompanying regulations, which are enforced by the Personal Data
            Protection Commission of Tanzania, as well as generally accepted international data protection
            principles (including the EU General Data Protection Regulation, where applicable to visitors from
            the EU/UK).
          </p>
        </LegalSection>

        <LegalSection title="2. Information We Collect">
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li><strong>Identity &amp; contact details</strong>  name, email address, phone number, postal address, and nationality.</li>
            <li><strong>Travel documents</strong>  passport details, visa information, flight itineraries, and travel insurance details, where required to process bookings, park permits, and immigration formalities.</li>
            <li><strong>Health &amp; dietary information</strong>  medical conditions, allergies, mobility requirements, or dietary preferences, shared voluntarily so we can plan a safe and comfortable safari.</li>
            <li><strong>Payment information</strong>  billing details and proof of payment for deposits and balances. Card details are processed securely by our banking and payment partners; we do not store full card numbers on our servers.</li>
            <li><strong>Communications</strong>  messages sent via our contact forms, WhatsApp, email, or social media channels.</li>
            <li><strong>Technical data</strong>  IP address, browser type, device information, and pages visited, collected automatically through cookies and similar technologies.</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. How We Use Your Information">
          <p>We use your personal data to:</p>
          <ul>
            <li>Prepare quotations, itineraries, and confirm bookings for safaris, accommodation, and related services.</li>
            <li>Arrange park entry permits, conservation fees, and liaise with lodges, camps, airlines, and ground transport operators on your behalf.</li>
            <li>Communicate with you about your trip, including confirmations, changes, and emergency contact during travel.</li>
            <li>Process payments and maintain financial records as required under Tanzanian tax and accounting law.</li>
            <li>Improve our website, services, and marketing  for example, by analysing which destinations and tours are most popular.</li>
            <li>Send you newsletters or promotional offers, but only where you have opted in, and you may unsubscribe at any time.</li>
            <li>Comply with legal obligations, including those of the Tanzania Tourist Licensing Authority, the Ministry of Natural Resources and Tourism, and immigration authorities.</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Sharing Your Information">
          <p>
            We do not sell your personal data. We share information only where necessary to deliver your safari,
            including with:
          </p>
          <ul>
            <li>Lodges, camps, hotels, and beach resorts where you will be staying.</li>
            <li>Tanzania National Parks (TANAPA), the Ngorongoro Conservation Area Authority, and other park or conservation authorities, for permit and entry purposes.</li>
            <li>Domestic airlines, charter operators, and ground transport providers.</li>
            <li>Travel insurance providers, where a claim or verification is required.</li>
            <li>Payment processors and banks, for the purpose of completing transactions.</li>
            <li>Government authorities, where required by Tanzanian law, court order, or for immigration and security purposes.</li>
          </ul>
          <p>
            Any third party we share data with is required to handle it securely and only use it for the purpose
            for which it was shared.
          </p>
        </LegalSection>

        <LegalSection title="5. International Data Transfers">
          <p>
            As many of our guests travel from outside Tanzania, your information may be transferred to and
            processed in countries other than your country of residence, including Tanzania, where our offices
            and partner suppliers are located. We take reasonable steps to ensure your data is protected to a
            standard consistent with this policy wherever it is processed.
          </p>
        </LegalSection>

        <LegalSection title="6. Data Retention">
          <p>
            We retain personal data for as long as necessary to fulfil the purposes described in this policy,
            including any legal, accounting, or reporting requirements under Tanzanian law (typically a minimum
            of five years for financial records). Travel documents and health information shared for a specific
            trip are retained only for as long as needed to plan and deliver that trip and are securely deleted
            or anonymised thereafter, unless you have given consent for longer retention (for example, for repeat
            bookings).
          </p>
        </LegalSection>

        <LegalSection title="7. Your Rights">
          <p>Subject to applicable law, you have the right to:</p>
          <ul>
            <li>Request access to the personal data we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your data, where it is no longer needed for the purposes it was collected.</li>
            <li>Withdraw consent to marketing communications at any time.</li>
            <li>Object to or request restriction of certain processing activities.</li>
            <li>Lodge a complaint with the Personal Data Protection Commission of Tanzania, or the relevant data protection authority in your home country.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the details in Section 10 below.
          </p>
        </LegalSection>

        <LegalSection title="8. Cookies">
          <p>
            Our website uses cookies and similar technologies to remember your preferences, understand how
            visitors use our site, and improve performance. You can control or disable cookies through your
            browser settings; however, doing so may affect certain features of the website, such as booking
            forms.
          </p>
        </LegalSection>

        <LegalSection title="9. Data Security">
          <p>
            We implement appropriate technical and organisational measures to protect your personal data against
            unauthorised access, loss, misuse, or alteration. While we take security seriously, no method of
            transmission over the internet or electronic storage is completely secure, and we cannot guarantee
            absolute security.
          </p>
        </LegalSection>

        <LegalSection title="10. Contact Us">
          <p>
            If you have questions about this Privacy Policy or wish to exercise your data protection rights,
            please contact us:
          </p>
          <ul>
            <li><strong>Gillead Safaris Tanzania Ltd</strong>  Arusha, Tanzania</li>
            <li>Phone: <a href="tel:+255753959375">+255 753 959 375</a></li>
            <li>Email: <a href="mailto:info@gillieadsafaris.com">info@gillieadsafaris.com</a></li>
          </ul>
        </LegalSection>

        <LegalSection title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
            legal requirements, or other factors. The "Last updated" date at the top of this page indicates when
            this policy was last revised. We encourage you to review this page periodically.
          </p>
        </LegalSection>
      </LegalPageWrapper>
    </div>
  );
}
