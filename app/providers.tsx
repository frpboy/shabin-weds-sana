'use client';

import { Providers } from '../src/providers/Providers';
import { AmbientEffects } from '../src/effects';
import MainLayout from '../src/layouts/MainLayout';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AmbientEffects />
      <MainLayout>{children}</MainLayout>
    </Providers>
  );
}
