import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { BREAKPOINTS, Value } from '@/types';
import ValuesDesktop from './values/values-desktop';
import ValuesMobile from './values/values-mobile';

const Values = ({ values }: { values: Value[] }) => {
  const isMobile = useMatchMedia(BREAKPOINTS.MD);

  return isMobile ? <ValuesMobile values={values} /> : <ValuesDesktop values={values} />;
};

export default Values;
