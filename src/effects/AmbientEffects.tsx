import AmbientGlow from './AmbientGlow';
import MouseTrail from './MouseTrail';
import ParallaxLayer from './ParallaxLayer';
import FilmGrain from './FilmGrain';

export default function AmbientEffects() {
  return (
    <>
      <FilmGrain />
      <AmbientGlow />
      <ParallaxLayer />
      <MouseTrail />
    </>
  );
}
