import { useEffect, useState } from 'react';

export const useCountdown = (defaultSeconds: number) => {
  const [seconds, setSeconds] = useState(defaultSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds === 0) {
          clearInterval(timer);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return { seconds };
};
