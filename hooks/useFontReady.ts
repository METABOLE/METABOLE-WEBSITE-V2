import { useEffect, useState } from 'react';

export function useFontReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Promise.all([
      document.fonts.load('1rem "Safiro Medium"'),
      document.fonts.load('1rem "Safiro Medium Italic"'),
      document.fonts.load('1rem "Safiro Regular"'),
      document.fonts.load('1rem "Safiro Regular Italic"'),
    ]).then(() => setReady(true));
  }, []);

  return ready;
}
