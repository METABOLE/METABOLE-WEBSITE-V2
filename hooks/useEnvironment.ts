import { useState, useEffect } from 'react';

export const useEnvironment = () => {
  const [isProd, setIsProd] = useState(true);
  const [isDev, setIsDev] = useState(true);
  const [environment, setEnvironment] = useState('production');

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '192.168.1.148';
    const isProd =
      window.location.hostname === 'metabole.studio' ||
      window.location.hostname === 'www.metabole.studio';

    setIsDev(isLocalhost);
    setIsProd(isProd);
    setEnvironment(isLocalhost ? 'development' : 'production');
  }, []);

  return {
    isProd,
    isDev,
    environment,
  };
};
