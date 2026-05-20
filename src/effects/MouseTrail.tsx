import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  scale: number;
  rot: number;
  vrot: number;
  active: boolean;
}

const PARTICLE_COUNT = 30;

export default function MouseTrail() {
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const particles = useRef<Particle[]>([]);
  const poolIndex = useRef(0);
  const lastSpawnTime = useRef(0);

  const mouseCoords = useRef({ x: 0, y: 0, currX: 0, currY: 0 });

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      alpha: 0,
      scale: 1,
      rot: 0,
      vrot: 0,
      active: false,
    }));

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;

      const now = performance.now();
      if (now - lastSpawnTime.current < 30) return;
      lastSpawnTime.current = now;

      const idx = poolIndex.current;
      const p = particles.current[idx];
      const el = particleRefs.current[idx];

      if (p && el) {
        p.x = e.clientX - 10;
        p.y = e.clientY - 10;
        p.vx = (Math.random() - 0.5) * 1.5;
        p.vy = -0.8 - Math.random() * 1.5; // Drift upwards
        p.alpha = 1;
        p.scale = 0.6 + Math.random() * 0.8;
        p.rot = Math.random() * 360;
        p.vrot = (Math.random() - 0.5) * 3;
        p.active = true;

        el.style.display = 'flex';
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) scale(${p.scale}) rotate(${p.rot}deg)`;
        el.style.opacity = '1';
      }

      poolIndex.current = (poolIndex.current + 1) % PARTICLE_COUNT;
    };

    const updateLoop = () => {
      const mc = mouseCoords.current;
      mc.currX += (mc.x - mc.currX) * 0.15;
      mc.currY += (mc.y - mc.currY) * 0.15;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles.current[i];
        const el = particleRefs.current[i];

        if (p.active && el) {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vrot;
          p.alpha -= 0.018; // Smooth, lingering fade

          if (p.alpha <= 0) {
            p.active = false;
            el.style.display = 'none';
          } else {
            el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) scale(${p.scale}) rotate(${p.rot}deg)`;
            el.style.opacity = p.alpha.toFixed(2);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none" aria-hidden="true">
      {/* Floating Gold Hearts */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { particleRefs.current[i] = el; }}
          style={{ display: 'none' }}
          className="absolute left-0 top-0 items-center justify-center font-cinzel text-primary text-lg md:text-xl will-change-transform drop-shadow-[0_2px_8px_rgba(199,169,127,0.6)]"
        >
          ♥
        </div>
      ))}
    </div>
  );
}
