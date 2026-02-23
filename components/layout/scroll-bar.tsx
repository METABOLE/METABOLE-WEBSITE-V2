import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function ScrollBar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  // const [percent, setPercent] = useState(0);

  const { contextSafe } = useGSAP();

  const scrollAnim = contextSafe(() => {
    gsap.set(progressBarRef.current, { height: 0 });

    gsap.to(progressBarRef.current, {
      height: '100%',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        scrub: true,
        // onUpdate: (self) => setPercent(self.progress),
      },
    });
  });

  useGSAP(() => {
    setTimeout(() => {
      requestAnimationFrame(() => scrollAnim());
    }, 200);
  }, []);

  return (
    <div className="right-x-half-default pointer-events-none fixed top-1/2 z-500 h-48 w-px -translate-y-1/2 bg-white/30 mix-blend-difference">
      <div ref={progressBarRef} className="absolute h-full w-px bg-white">
        {/* <SafeNumberFlow
          className="label absolute right-2 -bottom-[19px] min-w-[3ch] text-white tabular-nums"
          suffix="%"
          value={Math.min(Math.round(percent * 100), 100)}
        /> */}
        <svg
          className="absolute -right-[7px] -bottom-3 fill-white"
          fill="none"
          height="15"
          viewBox="0 0 15 15"
          width="15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 13L7 13L7 2L8 2L8 13Z" />
          <path d="M2 8L2 7L13 7L13 8L2 8Z" />
        </svg>

        {/* <svg
          className="absolute -right-[5px] -bottom-3 stroke-white"
          fill="none"
          height="11"
          viewBox="0 0 11 11"
          width="11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 11L5 11L5 -4.37114e-08L6 0L6 11Z" fill="#F1F2FF" />
          <path d="M0 6L8.74227e-08 5L11 5L11 6L0 6Z" fill="#F1F2FF" />
        </svg> */}
      </div>
    </div>
  );
}
