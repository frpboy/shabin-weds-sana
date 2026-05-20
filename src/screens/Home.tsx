'use client';

import { useState, useEffect } from 'react';
import SplashIntro from '../components/sections/SplashIntro';
import Hero from '../components/sections/Hero';
import InvitationMessage from '../components/sections/InvitationMessage';
import TimelineSection from '../components/sections/TimelineSection';
import VenueSection from '../components/sections/VenueSection';
import FamilySection from '../components/sections/FamilySection';
import GallerySection from '../components/sections/GallerySection';
import RsvpSection from '../components/sections/RsvpSection';
import Footer from '../components/sections/Footer';
import FloatingMusicButton from '../components/ui/buttons/FloatingMusicButton';

type GalleryPhoto = {
  id: number;
  url: string;
  caption: string;
};

export default function Home({ photos }: { photos: GalleryPhoto[] }) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!hasEntered) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [hasEntered]);

  return (
    <main className="relative z-10 w-full min-h-screen bg-transparent selection:bg-primary/20 selection:text-accent font-poppins">
      <SplashIntro
        onEnter={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          setHasEntered(true);
        }}
      />

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none h-0 overflow-hidden'}`}>
        <Hero />
        <InvitationMessage />
        <TimelineSection />
        <VenueSection />
        <FamilySection />
        <GallerySection photos={photos} />
        <RsvpSection />
        <Footer />

        <FloatingMusicButton />
      </div>
    </main>
  );
}
