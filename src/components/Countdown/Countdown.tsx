import { useCountdown } from '@/utils/hooks/useCountdown';

import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

interface CountdownProps {
  retryDelay: number;
  onRetry: () => Promise<number>;
}

export const Countdown = ({ retryDelay, onRetry }: CountdownProps) => {
  const { seconds, startCountdown } = useCountdown(retryDelay);

  if (!seconds)
    return (
      <Button variant='text' onClick={async () => {
        const retryDelay = await onRetry()
        startCountdown(retryDelay / 1000)
      }}>
        Запросить код еще раз
      </Button>
    );

  return (
    <Typography tag='p' variant='paragraph16-regular'>
      Запросить код повторно можно через {seconds} секунд
    </Typography>
  );
};
