import { motion } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import { STAGGER_CONTAINER, FADE_UP } from '../../motion';

export default function FamilySection() {
  const families = [
    {
      title: 'The Groom\'s Family',
      father: 'Saidalavi',
      mother: 'Bushara',
      grandparents: 'With heartfelt blessings from our family elders',
      residence: 'Madathodi House, Kulapprambu, Vettathur PO',
      quote: 'May your days be wrapped in sakoon, your bond grow stronger with every prayer, and your home shine with barakah.',
    },
    {
      title: 'The Bride\'s Family',
      father: 'Abdul Subair',
      mother: 'Shamsunisha',
      grandparents: 'With heartfelt blessings from our family elders',
      residence: 'Thekke Peediyekkal House, Ranagattoor',
      quote: 'May Allah guide your hearts as one, bless your steps with rahmah, and grant you a lifetime of joy together.',
    },
  ];

  return (
    <SectionContainer id="family" className="relative z-10 pt-2 md:pt-4 pb-4 md:pb-8">
      <SectionTitle
        title="With Heartfelt Blessings"
        subtitle="Honoring our beloved parents & elders"
        className="my-4 md:my-6"
      />

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch"
      >
        {families.map((fam) => (
          <motion.div key={fam.title} variants={FADE_UP} className="h-full">
            <Card variant="glass" className="h-full p-8 md:p-12 text-center border-primary/30 relative flex flex-col items-center shadow-md">
              <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-6 bg-secondary text-primary">
                <span className="font-cinzel text-lg">✦</span>
              </div>
              <span className="font-poppins uppercase text-xs tracking-widest text-primary font-medium mb-3 block">
                {fam.title}
              </span>
              <h3 className="font-cinzel text-2xl text-accent font-medium mb-2">
                <span className="block">{fam.father}</span>
                <span className="block font-cormorant italic text-primary text-xl my-1 font-light">&</span>
                <span className="block">{fam.mother}</span>
              </h3>
              <p className="font-poppins text-xs text-text/70 mb-6 italic">
                {fam.residence}
              </p>
              <div className="w-16 h-px bg-primary/40 my-4" />
              <p className="font-cormorant text-base text-text/90 italic font-light">
                &ldquo;{fam.quote}&rdquo;
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
