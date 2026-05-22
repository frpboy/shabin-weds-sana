import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/buttons/Button';
import { EASE } from '../../motion';
import { weddingData } from '../../config/weddingData';
import { useMusic } from '../../providers/MusicProvider';
import { content } from '../../content';

interface SplashIntroProps {
  onEnter: () => void;
}

export default function SplashIntro({ onEnter }: SplashIntroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);
  const { play } = useMusic();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest');
    if (guestParam) {
      setGuestName(guestParam);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'unset' : 'hidden';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOpen = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsOpen(true);
    play();
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      onEnter();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: EASE.luxury }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent px-6 text-center select-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/18 via-secondary/12 to-secondary/16 pointer-events-none" />

          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
            <div className="w-[160vw] h-[160vw] max-w-[1450px] max-h-[1450px] border border-primary/25 rotate-45 rounded-[88px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10 max-w-xl mx-auto flex flex-col items-center"
          >
            <span className="font-cormorant italic text-xl md:text-2xl text-primary mb-5 tracking-wide">
              ﷽
            </span>
            <p className="font-cormorant italic text-base md:text-2xl text-accent/90 mb-10 tracking-wide leading-relaxed">
              "In the name of Allah, the Most Gracious, the Most Merciful"
            </p>

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary/50 flex items-center justify-center mb-7 bg-white/[0.03] backdrop-blur-sm shadow-inner">
              <span className="font-cinzel text-2xl md:text-3xl text-primary font-medium tracking-tighter">
                {weddingData.monogram}
              </span>
            </div>

            <h1 className="font-cinzel text-3xl md:text-6xl text-accent font-medium mb-2 tracking-wide max-w-3xl leading-tight">
              <span className="block whitespace-nowrap">{weddingData.groom.fullName}</span>
              <span className="block font-cormorant italic text-primary text-3xl md:text-4xl my-1.5 font-light">&</span>
              <span className="block">{weddingData.bride.fullName}</span>
            </h1>
            <p className="font-poppins uppercase text-sm md:text-[28px] tracking-[0.2em] text-primary mb-7 font-medium">
              Wedding Celebration
            </p>

            {/* Personalized Guest Greeting */}
            <div className="py-3 px-8 rounded-full bg-primary/8 border border-primary/35 mb-8 max-w-sm shadow-[0_0_18px_rgba(212,175,55,0.12)]">
              <span className="font-poppins text-base md:text-2xl text-accent font-medium tracking-wide">
                {guestName ? `Dear ${guestName} & Family` : content.splash.defaultGreeting}
              </span>
            </div>

            <Button
              variant="solid"
              size="lg"
              onClick={handleOpen}
              className="min-w-[230px] text-base md:text-lg shadow-[0_10px_32px_rgba(212,175,55,0.32)] hover:shadow-[0_16px_44px_rgba(212,175,55,0.42)] cursor-pointer rounded-lg"
            >
              {content.splash.enterButton}
            </Button>
          </motion.div>

          <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
            <p className="font-poppins text-[10px] tracking-widest text-accent/50 uppercase">
              {content.splash.subtitle}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
