import { useState } from 'react';

export const useView = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);

  return { state: { isOtpSent } };
};
