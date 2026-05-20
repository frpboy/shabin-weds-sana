import React, { createContext, useContext } from 'react';

const LenisContext = createContext<boolean>(true);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <LenisContext.Provider value={true}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
