export default function FilmGrain() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[110] opacity-[0.035] select-none mix-blend-overlay ios-no-blend" aria-hidden="true">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
