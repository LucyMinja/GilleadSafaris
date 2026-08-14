import type { Metadata } from 'next';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';
import ScrollToTop from '@/app/components/ScrollToTop';
import NewsletterPopup from '@/app/components/NewsletterPopup';
import PageTransition from '@/app/components/PageTransition';
import '@/styles/index.css';

export const metadata: Metadata = {
  title: 'Gillead Safaris — Tanzania, East Africa',
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
      </head>
      <body
        className="min-h-screen"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", backgroundColor: '#F1EAE0', color: '#6D6753' }}
      >
        <ScrollToTop />
        <Navigation />
        <NewsletterPopup />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
