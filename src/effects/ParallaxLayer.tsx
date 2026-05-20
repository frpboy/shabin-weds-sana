import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxLayer() {
  const { scrollYProgress } = useScroll();

  // Map scroll progress to subtle vertical shifts
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Background layer 2 (Mid depth) */}
      <motion.div style={{ y: y1 }} className="absolute right-[5%] top-[50%] opacity-20">
        <div className="w-[500px] h-[500px] rounded-full border border-primary/30 rotate-12 flex items-center justify-center">
          <div className="w-[480px] h-[480px] rounded-full border border-primary/20" />
        </div>
      </motion.div>

      {/* Background layer 3 (Foreground depth) */}
      <motion.div style={{ y: y2 }} className="absolute left-[20%] top-[75%] opacity-25">
        <div className="w-64 h-64 border border-primary/20 rotate-45 rounded-[40px]" />
      </motion.div>
    </div>
  );
}
