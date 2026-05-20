import { motion } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import AnimatedDivider from '../ui/layout/AnimatedDivider';
import { weddingData } from '../../config/weddingData';

export default function InvitationMessage() {
  return (
    <SectionContainer id="invitation" className="relative z-10 pt-4 md:pt-12 pb-2 md:pb-4">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-cinzel text-4xl md:text-5xl text-primary/90 mb-4 tracking-widest select-none drop-shadow-[0_2px_10px_rgba(199,169,127,0.3)] font-light"
        >
          ﷽
        </motion.div>
      </div>

      <SectionTitle 
        title="The Invitation" 
        subtitle="With the blessings of Allah & our beloved families" 
      />

      <div className="max-w-3xl mx-auto text-center">
        <Card variant="glass" className="relative p-8 md:p-14 border border-primary/40 shadow-xl">
          <span className="font-cormorant italic text-primary text-xl md:text-2xl mb-4 block">
            "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them..."
          </span>
          <span className="font-poppins text-xs tracking-[0.2em] uppercase text-accent/70 block mb-10">
            — Surah Ar-Rum 30:21
          </span>

          <p className="font-poppins text-sm md:text-base leading-relaxed text-text/90 mb-8 font-light">
            We invite you to share in our joy and celebrate the sacred union of our hearts. Your presence and heartfelt prayers will make our celebration complete as we embark on this blessed journey together.
          </p>

          <div className="flex flex-col items-center mt-8">
            <div className="font-cinzel text-xl md:text-2xl text-accent font-medium leading-snug">
              <span className="block">{weddingData.groom.fullName}</span>
              <span className="block font-cormorant italic text-primary text-lg md:text-xl my-1 font-light">&</span>
              <span className="block">{weddingData.bride.fullName}</span>
            </div>
          </div>
        </Card>

        <div className="mt-4 md:mt-6">
          <AnimatedDivider />
        </div>
      </div>
    </SectionContainer>
  );
}
