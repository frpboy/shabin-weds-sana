import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import Button from '../ui/buttons/Button';
import { weddingData } from '../../config/weddingData';
import { BiMap, BiNavigation, BiCalendarPlus } from 'react-icons/bi';

export default function VenueSection() {
  const venueName = weddingData.wedding.venue || 'Shifa Convention Center, Perinthalmanna';
  const venueAddress = weddingData.wedding.address || 'Perinthalmanna, Kerala';
  const mapsUrl = weddingData.wedding.mapsUrl || 'https://maps.app.goo.gl/JDr5v3dgUuwPNbnJA';
  const calendarUrl = weddingData.wedding.calendarUrl;

  return (
    <SectionContainer id="venue" className="relative z-10 pt-2 md:pt-4">
      <SectionTitle title="The Venue" subtitle="Where our sacred journey begins" className="my-4 md:my-6" />

      <div className="max-w-2xl mx-auto px-4">
        {/* Unified Venue Information & Map Card */}
        <Card variant="glass" className="flex flex-col p-6 md:p-12 border-primary/40 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary mb-6 mx-auto">
            <BiMap size={24} />
          </div>

          <span className="font-poppins uppercase tracking-widest text-xs text-primary font-medium mb-2 block text-center">
            Wedding Location
          </span>
          <h3 className="font-cinzel text-2xl md:text-3xl text-accent font-medium mb-2 text-center">
            {venueName}
          </h3>
          <p className="font-poppins text-sm md:text-base text-text/80 leading-relaxed mb-6 font-light text-center">
            {venueAddress}
          </p>

          {/* Google Maps Query Embed Inside Card */}
          <div className="relative w-full h-[260px] md:h-[360px] rounded-xl overflow-hidden border border-primary/30 shadow-inner mb-8 bg-secondary/30">
            <iframe
              title="Shifa Convention Center, Perinthalmanna Map"
              src="https://maps.google.com/maps?q=Shifa%20Convention%20Center,%20Perinthalmanna,%20Kerala&t=&z=12&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05)' }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="solid" className="w-full py-3.5 flex items-center justify-center gap-2 shadow-md">
                <BiNavigation size={18} />
                <span className="text-xs uppercase tracking-wider font-poppins font-medium">Navigate</span>
              </Button>
            </a>

            <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="glass" className="w-full py-3.5 flex items-center justify-center gap-2 border-primary/60 text-accent hover:bg-primary/20 shadow-sm">
                <BiCalendarPlus size={18} />
                <span className="text-xs uppercase tracking-wider font-poppins font-medium">Add to Calendar</span>
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </SectionContainer>
  );
}
