import { useEffect, useState } from 'react';

export const useCountdown = (defaultSeconds: number) => {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(true)

  const startCountdown = (seconds: number) => {
    setSeconds(seconds)
    setIsRunning(true)
  }

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds <= 0) {
          setIsRunning(false);
          clearInterval(timer);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  return { seconds, startCountdown };
};
