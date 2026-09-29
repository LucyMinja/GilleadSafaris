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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Tanzania, East Africa`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Explore and book unforgettable safari adventures in Tanzania with a visually stunning, fully responsive website.',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        />
        {GA_MEASUREMENT_ID && (
          <>
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
