import { motion } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import { FADE_UP, STAGGER_CONTAINER } from '../../motion';
import { weddingData } from '../../config/weddingData';

export default function TimelineSection() {
  const events = [
    {
      title: 'Grand Reception',
      time: 'July 19, 2026 • 4:30 PM Onwards',
      location: weddingData.wedding.venue || 'Shifa Convention Center',
      desc: 'Join us for an evening of celebration, love, and a traditional feast as we mark the beginning of our married life.',
    },
    {
      title: 'Family Ceremony',
      time: 'July 19, 2026 • 6:00 PM Onwards',
      location: weddingData.wedding.venue || 'Shifa Convention Center',
      desc: 'The sacred ceremony followed by a celebratory feast for the family and close relatives.',
    },
  ];

  return (
    <SectionContainer id="timeline" className="relative z-10 pt-0 md:pt-2 pb-2 md:pb-4">
      <SectionTitle title="Event Schedule" subtitle="The timeline of our auspicious day" className="my-4 md:my-6" />

      <div className="relative max-w-5xl mx-auto px-4 py-2 md:py-4">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
        >
          {events.map((event, idx) => (
            <motion.div key={idx} variants={FADE_UP} className="w-full h-full flex">
              <Card variant="glass" className="p-8 md:p-10 text-center hover:border-primary/50 transition-colors shadow-md flex flex-col justify-between w-full h-full">
                <div>
                  <div className="w-12 h-12 mx-auto rounded-full border border-primary/50 flex items-center justify-center mb-6 text-primary">
                    ✦
                  </div>
                  <span className="font-poppins uppercase text-xs tracking-widest text-primary font-medium mb-3 block">
                    {event.time}
                  </span>
                  <h3 className="font-cinzel text-3xl text-accent font-medium mb-2">
                    {event.title}
                  </h3>
                  <span className="font-poppins text-xl text-text/70 block mb-6 italic">
                    {event.location}
                  </span>
                </div>
                <p className="font-poppins text-base text-text/80 leading-relaxed font-light max-w-md mx-auto mt-2">
                  {event.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
