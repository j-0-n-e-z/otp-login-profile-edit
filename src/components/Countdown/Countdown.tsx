import { useCountdown } from '@/utils/hooks/useCountdown';

import { Button } from '../Button/Button';

interface CountdownProps {
  retryDelay: number;
  onRetry: () => void;
}

export const Countdown = ({ retryDelay, onRetry }: CountdownProps) => {
  const { seconds } = useCountdown(retryDelay);

  if (!seconds) return <Button onClick={onRetry}>retry</Button>;

  return <p>Запросить код повтороно можно через {seconds}</p>;
};
