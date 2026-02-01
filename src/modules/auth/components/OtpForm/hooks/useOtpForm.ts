import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import { setIsOtpSent, useAuthViewStore } from '@/modules/auth/store';
import { usePostAuthOtpMutation } from '@/utils/api/hooks/usePostAuthOtpMutation';

import type { OtpScheme } from '../constants/otpScheme';

import { otpScheme } from '../constants/otpScheme';

export const useOtpForm = () => {
  const authViewStore = useAuthViewStore();

  const otpForm = useForm<OtpScheme>({
    mode: 'onTouched',
    resolver: zodResolver(otpScheme),
    defaultValues: {
      phone: ''
    }
  });

  const postAuthOtpMutation = usePostAuthOtpMutation();

  const onSubmit = otpForm.handleSubmit(async (values) => {
    const postAuthOtpMutationResponse = await postAuthOtpMutation.mutateAsync(
      { params: values },
      {
        onError: (e) => {
          if (e instanceof AxiosError) {
            if (e.response?.data.message) {
              otpForm.setError('phone', { message: e.response.data.message });
            }
          }
        }
      }
    );
    setIsOtpSent(true);
    authViewStore.setRetryDelay(postAuthOtpMutationResponse.data.retryDelay);
  });

  return {
    form: otpForm,
    state: { isLoading: otpForm.formState.isSubmitting },
    functions: { onSubmit }
  };
};
