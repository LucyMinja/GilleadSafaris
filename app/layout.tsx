import type { Metadata } from 'next';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import ScrollToTop from '@/app/components/ScrollToTop';
import NewsletterPopup from '@/app/components/NewsletterPopup';
import PageTransition from '@/app/components/PageTransition';
import MotionProvider from '@/app/components/MotionProvider';
import CookieConsent from '@/app/components/CookieConsent';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import '@/styles/index.css';

// Set at build time (static export — no server to read this at request
// time). Get this from Google Analytics 4 → Admin → Data Streams → your
// web stream → Measurement ID, and add it to .env.local as
// NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX before deploying. Until it's
// set, no GA script loads at all — nothing tracks anyone, consent or not.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Site isn't live yet — robots stays 'noindex, nofollow' site-wide. Flip to
// 'index, follow' here (and see app/robots.ts) when ready to go live.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Tanzania, East Africa`,
    template: `%s`,
  },
  description:
    'Explore and book unforgettable safari adventures in Tanzania with a visually stunning, fully responsive website featuring captivating images and seamless navigation.',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Turbopack silently drops the external @import in src/styles/fonts.css
            (confirmed: it never appears in the compiled CSS bundle, no network
            request is ever made for it) — loading via <link> instead, which
            Next.js hoists into <head> regardless of the CSS bundler. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        />
        {GA_MEASUREMENT_ID && (
          <>
            {/* Consent Mode v2 default — MUST run before gtag.js loads.
                Both storage types start denied, so no GA cookie is set and
                no personal data is sent until CookieConsent.tsx records an
                explicit "Accept All". A decline is a real decline: GA only
                gets anonymous, cookieless pings for aggregate modeling,
                never the visitor's own cookie-based tracking. */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('consent', 'default', {
                    analytics_storage: 'denied',
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied',
                    wait_for_update: 500
                  });
                `,
              }}
            />
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className="min-h-screen"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: '#F1EAE0', color: '#6D6753' }}
      >
        <MotionProvider>
          <ScrollToTop />
          <Navigation />
          <NewsletterPopup />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
