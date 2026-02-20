import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { BREAKPOINTS } from '@/types';
import ScrollerDesktop from './processus/scroller-desktop';
import ScrollerMobile from './processus/scroller-mobile';

const Processus = () => {
  const isTablet = useMatchMedia(BREAKPOINTS.MD);

  return <>{isTablet ? <ScrollerMobile /> : <ScrollerDesktop />}</>;
};

export default Processus;
