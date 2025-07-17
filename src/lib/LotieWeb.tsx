// components/Lottie.tsx
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieProps {
  width?: number;
  height?: number;
  speed?:number,
  options: {
    animationData: object;
    loop?: boolean;
    autoplay?: boolean;
    rendererSettings?: object;
  };
}

const Lottie: React.FC<LottieProps> = ({
  width = 300,
  height = 300,
  options,
  speed
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: options.loop ?? true,
        autoplay: options.autoplay ?? true,
        animationData: options.animationData,
        rendererSettings: options.rendererSettings,
       ...(speed? {speed}:{})
      });
    }

    return () => {
      animationRef.current?.destroy();
    };
  }, [options]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        overflow: 'hidden',
        margin: '0 auto',
      }}
    />
  );
};

export default Lottie;
