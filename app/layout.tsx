import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollRefresh } from '@/components/providers/ScrollRefresh';
import { event } from '@/data/event';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
});

const title = `${event.name} ${event.edition}`;
const description = `${event.tagline} ${event.dateLabel} in ${event.city}.`;

export const metadata: Metadata = {
  title: {
    default: `${title} · ${event.city}`,
    template: `%s · ${title}`,
  },
  description,
  applicationName: title,
  manifest: '/site.webmanifest',
  keywords: ['design conference', 'creative conference', 'Ogbomosho', 'Nigeria', 'Africa', 'designers', 'creatives'],
  openGraph: {
    title: `${title} · ${event.city}`,
    description,
    type: 'website',
    locale: 'en_NG',
    siteName: title,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} · ${event.city}`,
    description,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}>
      <body className="bg-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>

        <Navbar />
        <ScrollRefresh />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
