import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { weddingData } from '../../config/weddingData';
import { VARIANTS, EASE } from '../../motion';
import useCountdown from '../../hooks/useCountdown';
import useReducedMotion from '../../hooks/useReducedMotion';
import { content } from '../../content';

export default function HeroContent() {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(weddingData.wedding.date));

  const timeLeft = useCountdown(weddingData.wedding.date);
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fade out scroll indicator on scroll down
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE.luxury, delay: 0.2 }}
        className="mb-8 flex items-center justify-center"
      >
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-primary/60 mx-4" />
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </motion.div>

      <motion.span
        variants={VARIANTS.fadeUp(reducedMotion)}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="font-poppins uppercase tracking-[0.35em] text-xs md:text-sm text-primary mb-6 font-medium"
      >
        {content.hero.invitationIntro}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE.luxury, delay: 0.6 }}
        className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-accent font-medium my-4 tracking-wide leading-tight max-w-4xl"
      >
        {weddingData.groom.shortName}
        <span className="block font-cormorant italic text-primary text-4xl md:text-6xl my-3 font-light">
          &
        </span>
        {weddingData.bride.shortName}
      </motion.h1>

      <motion.p
        variants={VARIANTS.fadeUp(reducedMotion)}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="font-cormorant text-2xl md:text-3xl text-text/90 font-light mt-6 mb-12 tracking-wider"
      >
        {formattedDate}
      </motion.p>

      <motion.div
        variants={VARIANTS.staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto mb-16 px-2 w-full"
      >
        {timeUnits.map((unit) => (
          <motion.div key={unit.label} variants={VARIANTS.scaleUp(reducedMotion)}>
            <div className="flex flex-col items-center justify-center py-5 px-3 md:py-6 md:px-5 rounded-2xl border border-primary/15 bg-primary/[0.03] backdrop-blur-md text-center shadow-[0_8px_32px_rgba(199,169,127,0.06)] hover:border-primary/30 transition-all duration-500">
              <span className="font-cinzel text-3xl md:text-5xl text-accent font-light mb-1.5 tracking-tight">
                <span suppressHydrationWarning>
                  {mounted ? String(unit.value).padStart(2, '0') : '00'}
                </span>
              </span>
              <span className="font-poppins uppercase text-[9px] md:text-xs tracking-[0.25em] text-primary/80 font-medium">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Scroll Indicator - Fades out on scroll down */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 flex flex-col items-center pointer-events-none"
      >
        <div className="w-6 h-10 border border-primary/50 rounded-full flex justify-center pt-2 shadow-sm bg-secondary/30 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-2 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
}
