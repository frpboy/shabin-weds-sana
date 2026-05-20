import { motion } from 'framer-motion';

export default function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Ultra-subtle drifting gradient field (left) */}
      <motion.div
        animate={{
          x: [-16, 18, -16],
          y: [-10, 14, -10],
          scale: [1, 1.03, 1],
          opacity: [0.06, 0.11, 0.06],
        }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[16vh] -left-[18vw] w-[58vw] h-[58vw] max-w-[680px] max-h-[680px] rounded-full bg-gradient-to-br from-primary/22 via-[#8b0000]/16 to-transparent blur-[120px]"
      />

      {/* Ultra-subtle drifting gradient field (right) */}
      <motion.div
        animate={{
          x: [10, -14, 10],
          y: [8, -10, 8],
          scale: [1, 1.08, 1],
          opacity: [0.07, 0.13, 0.07],
        }}
        transition={{ duration: 48, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-[42vh] -right-[20vw] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tl from-primary/24 via-[#5a0000]/18 to-transparent blur-[110px]"
      />

      {/* Subtle Luxury Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
    </div>
  );
}
