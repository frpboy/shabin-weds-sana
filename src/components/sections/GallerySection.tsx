import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import { content } from '../../content';

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const photos = [
    { id: 1, url: '/images/Indhira-Jason-Wedding-23-ea0654d1228142eeab611e87d3f27e40.webp', caption: 'Sacred Vows' },
    { id: 2, url: '/images/JackandVivian-KellyHornberger-111-738f6a7872c648bcb69efd1932148ed0.webp', caption: 'Blessed Union' },
    { id: 3, url: '/images/AFTERCEREMONY-45-a52a8b106fd34d989e3a4de7c4388e70.webp', caption: 'Cherished Moments' },
    { id: 4, url: '/images/Wedding-Pose-Janet-Lin-Photography-9ef7e73535e34beb967e9f7c360b12fb.webp', caption: 'Elegant Attire' },
    { id: 5, url: '/images/Wedding-Pose-FOR-THE-LOVE-OF-IT-81f2ea6b25ce4902b553c425779388c5.webp', caption: 'Together Forever' },
    { id: 6, url: '/images/Portraits-41-342c5ab4e22147cc84bad49a43f2e952.webp', caption: 'Endless Love' },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, photos.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const activePhoto = photos[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <SectionContainer id="gallery" className="relative z-10 pt-2 md:pt-4">
      <SectionTitle title={content.gallery.sectionTitle} subtitle={content.gallery.sectionSubtitle} className="my-4 md:my-6" />

      <div className="max-w-4xl mx-auto px-4 relative flex flex-col items-center">
        <div
          className="relative w-full max-w-[310px] md:max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-secondary flex items-center justify-center select-none group cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            if (x < rect.width / 3) handlePrev();
            else if (x > (rect.width * 2) / 3) handleNext();
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activePhoto.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 overflow-hidden touch-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) handleNext();
                if (info.offset.x > 50) handlePrev();
              }}
            >
              {/* Image with subtle zoom drift */}
              <motion.img
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                src={activePhoto.url}
                alt={activePhoto.caption}
                loading={activePhoto.id === 1 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />

              {/* Warm tone layer & soft light leaks */}
              <div className="absolute inset-0 bg-amber-950/10 mix-blend-color-burn pointer-events-none" />
              <motion.div 
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none" 
              />
              <motion.div 
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-[40px] pointer-events-none" 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Jump to photo ${index + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'w-6 h-1.5 bg-primary shadow-sm shadow-primary/50' : 'w-1.5 h-1.5 bg-primary/40 hover:bg-primary/80'}`}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
