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
  title: 'Shabin & Sana — Wedding Invitation',
  description: 'Wedding invitation and RSVP website for Muhammed Shabin and Sana Subair.',
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
