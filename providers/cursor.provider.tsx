import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export enum CURSOR_TYPE {
  DEFAULT = 'default',
  POINTER = 'pointer',
  SEE_MORE = 'seeMore',
  PLAYER = 'player',
  NEXT = 'next',
  PREVIOUS = 'previous',
}

export type CursorState = {
  variant: CURSOR_TYPE;
  /** Only when variant === CURSOR_TYPE.PLAYER */
  isPlaying?: boolean;
};

type CursorContextType = {
  cursor: CursorState;
  setCursor: (variant: CURSOR_TYPE, options?: { isPlaying?: boolean }) => void;
};

const defaultCursor: CursorState = { variant: CURSOR_TYPE.DEFAULT };

const CursorContext = createContext<CursorContextType>({
  cursor: defaultCursor,
  setCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursor, setCursorState] = useState<CursorState>(defaultCursor);

  const setCursor = useCallback((variant: CURSOR_TYPE, options?: { isPlaying?: boolean }) => {
    setCursorState((prev) => {
      const next: CursorState = { variant };
      if (variant === CURSOR_TYPE.PLAYER && options?.isPlaying !== undefined) {
        next.isPlaying = options.isPlaying;
      } else if (variant === CURSOR_TYPE.PLAYER && prev.variant === CURSOR_TYPE.PLAYER) {
        next.isPlaying = prev.isPlaying;
      }
      return next;
    });
  }, []);

  return <CursorContext.Provider value={{ cursor, setCursor }}>{children}</CursorContext.Provider>;
};
