import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { OtpScheme } from '../constants/otpScheme';

import { otpScheme } from '../constants/otpScheme';

export const useOtpForm = () => {
  const otpForm = useForm<OtpScheme>({
    mode: 'onBlur',
    resolver: zodResolver(otpScheme)
  });

  const onSubmit = otpForm.handleSubmit((values) => {
    console.log(values);
  });

  return {
    form: otpForm,
    state: { isLoading: otpForm.formState.isSubmitting },
    functions: { onSubmit }
  };
};
