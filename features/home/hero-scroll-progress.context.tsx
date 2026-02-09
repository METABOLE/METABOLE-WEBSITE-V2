'use client';

import { createContext, type MutableRefObject, useContext } from 'react';

const HeroScrollProgressContext = createContext<MutableRefObject<number> | null>(null);

export const useHeroScrollProgress = () => useContext(HeroScrollProgressContext);

export const HeroScrollProgressProvider = HeroScrollProgressContext.Provider;
