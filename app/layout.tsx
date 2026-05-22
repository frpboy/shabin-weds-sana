import type { Metadata } from 'next';
import { Cinzel, Great_Vibes, Montserrat } from 'next/font/google';
import './globals.css';
import AppProviders from './providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-great-vibes',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shabin-weds-sana.vercel.app'),
  title: 'Shabin & Sana — Wedding Invitation',
  description: 'Wedding invitation and RSVP website for Muhammed Shabin and Sana Subair.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Shabin & Sana — Wedding Invitation',
    description: 'Wedding invitation and RSVP website for Muhammed Shabin and Sana Subair.',
    images: [{ url: '/og/og-card.png', width: 1200, height: 630, alt: 'Wedding themed invitation card' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shabin & Sana — Wedding Invitation',
    description: 'Wedding invitation and RSVP website for Muhammed Shabin and Sana Subair.',
    images: ['/og/og-card.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${cinzel.variable} ${greatVibes.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
