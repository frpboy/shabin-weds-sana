import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import Card from '../ui/cards/Card';
import Button from '../ui/buttons/Button';
import { weddingData } from '../../config/weddingData';
import { STAGGER_CONTAINER, SCALE_UP, FADE_UP } from '../../motion';
import { BiCalendarPlus } from 'react-icons/bi';
import useCountdown from '../../hooks/useCountdown';

export default function CountdownSection() {
  const timeLeft = useCountdown(weddingData.wedding.date);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <SectionContainer id="countdown" className="relative z-10">
      <SectionTitle title="Countdown To Forever" subtitle="Anticipating our cherished moments" />

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto px-4 mb-10"
      >
        {timeUnits.map((unit) => (
          <motion.div key={unit.label} variants={SCALE_UP}>
            <Card variant="glass" className="flex flex-col items-center justify-center p-6 md:p-8 border-primary/30 text-center hover:border-primary/60 transition-colors shadow-md">
              <span className="font-cinzel text-4xl md:text-6xl text-accent font-medium mb-2 tracking-tight">
                <span suppressHydrationWarning>
                  {mounted ? String(unit.value).padStart(2, '0') : '00'}
                </span>
              </span>
              <span className="font-poppins uppercase text-[10px] md:text-xs tracking-[0.25em] text-primary font-medium">
                {unit.label}
              </span>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Add to Calendar Button */}
      <motion.div
        variants={FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <a href={weddingData.wedding.calendarUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="solid" size="lg" className="flex items-center gap-2.5 px-8 py-3.5 shadow-lg cursor-pointer">
            <BiCalendarPlus size={22} />
            <span className="text-sm font-medium tracking-wide">Add to Google Calendar</span>
          </Button>
        </a>
      </motion.div>
    </SectionContainer>
  );
}
