import { createContext, ReactNode, useContext, useState } from 'react';

interface LayoutColorContextType {
  isLayoutDark: boolean;
  setIsLayoutDark: (isDark: boolean) => void;
}

const LayoutColorContext = createContext<LayoutColorContextType>({
  isLayoutDark: true,
  setIsLayoutDark: () => {},
});

export const useLayoutColor = () => useContext(LayoutColorContext);

export const LayoutColorProvider = ({ children }: { children: ReactNode }) => {
  const [isLayoutDark, setIsLayoutDark] = useState(true);

  return (
    <LayoutColorContext.Provider value={{ isLayoutDark, setIsLayoutDark }}>
      {children}
    </LayoutColorContext.Provider>
  );
};
