'use client';

import { LegalHero, LegalPageWrapper, LegalSection } from '@/app/components/LegalPageLayout';
import { REOPEN_EVENT } from '@/app/components/CookieConsent';

export default function CookiePolicy() {
  return (
    <div>
      <LegalHero title="Cookie Policy" updated="26 August 2026" />

      <LegalPageWrapper>
        <LegalSection title="1. What Cookies Are">
          <p>
            Cookies are small text files placed on your device when you visit a website. They let a site
            remember things between page loads and visits — like whether you've seen a popup — or, for analytics
            cookies, help us understand how visitors use the site in aggregate. This policy explains what we use
            and the choices you have.
          </p>
        </LegalSection>

        <LegalSection title="2. Cookies We Use">
          <p><strong>Strictly necessary</strong> — always active, can't be switched off:</p>
          <ul>
            <li>Session and preference cookies that keep the site itself working (e.g. remembering that you've dismissed a popup).</li>
          </ul>
          <p><strong>Analytics — Google Analytics</strong> — only set with your consent:</p>
          <ul>
            <li><strong>_ga, _ga_*</strong> — distinguish visitors and sessions, so we can see aggregate traffic and popular pages. Set for up to 2 years.</li>
            <li><strong>_gid</strong> — distinguishes visitors over a shorter window. Set for 24 hours.</li>
          </ul>
          <p>
            We don't use advertising, remarketing, or social media tracking cookies.
          </p>
        </LegalSection>

        <LegalSection title="3. How Consent Works">
          <p>
            When you first visit, Google Analytics is set to run in a consent-denied state (Google's "Consent
            Mode"): no <code>_ga</code> cookie is set and nothing is tied to you personally. If you decline
            or simply don't respond, it stays that way — Google may still receive anonymous, cookieless signals
            it uses to model aggregate traffic, but no cookie is placed on your device and nothing is linked to
            you individually.
          </p>
          <p>
            If you click <strong>"Accept All,"</strong> full Google Analytics cookies are enabled and we get
            visitor-level analytics (still without directly identifying you personally — Google Analytics
            reports in aggregate, not by name). You can change your mind at any time using{' '}
            <button
              onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
              style={{ color: '#8D694B', textDecoration: 'underline', textUnderlineOffset: '2px', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}
            >
              the cookie preferences link in our footer
            </button>
            , which reopens this choice.
          </p>
        </LegalSection>

        <LegalSection title="4. Third-Party Processor">
          <p>
            Google Analytics is provided by Google LLC. Where analytics cookies are active, data may be
            processed on Google's servers outside Tanzania, including in the United States, under Google's own
            data processing terms. See{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>{' '}
            for how Google itself handles this data.
          </p>
        </LegalSection>

        <LegalSection title="5. Browser Controls">
          <p>
            Independently of the choice above, you can block or delete cookies at any time through your browser
            settings. Blocking strictly necessary cookies may affect how parts of the site work, such as booking
            forms.
          </p>
        </LegalSection>

        <LegalSection title="6. Changes to This Policy">
          <p>
            We may update this Cookie Policy as our use of cookies changes. The "Last updated" date at the top
            of this page reflects the latest revision. See our{' '}
            <a href="/privacy-policy">Privacy Policy</a> for how we handle personal data more broadly.
          </p>
        </LegalSection>
      </LegalPageWrapper>
    </div>
  );
}
