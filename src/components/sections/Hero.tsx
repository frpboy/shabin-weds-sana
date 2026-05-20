import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
