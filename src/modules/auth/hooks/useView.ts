import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { usePostAuthOtpMutation } from '@/utils/api/hooks/usePostAuthOtpMutation';
import { usePostUserSignInMutation } from '@/utils/api/hooks/usePostUserSignInMutation';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { useStore } from '@/utils/store';

import type { OtpFormScheme } from '../constants/otpFormScheme';
import type { PhoneFormScheme } from '../constants/phoneFormScheme';

import { otpFormScheme } from '../constants/otpFormScheme';
import { phoneFormScheme } from '../constants/phoneFormScheme';

export const useView = () => {
  const [stage, setStage] = useState<'otp' | 'phone'>('phone');
  const [submittedPhones, setSubmittedPhones] = useState<{ [key: string]: number }>({});

  const authForm = useForm<OtpFormScheme | PhoneFormScheme>({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      otp: ''
    },
    resolver: zodResolver(stage === 'phone' ? phoneFormScheme : otpFormScheme)
  });

  const phone = authForm.watch('phone');

  useEffect(() => {
    if (phone.length < 10 && !submittedPhones[phone]) setStage('phone');
  }, [phone]);

  useEffect(() => {
    if (submittedPhones[phone] > Date.now()) {
      setStage('otp');
    }
  }, [phone]);

  const postAuthOtpMutation = usePostAuthOtpMutation();
  const postUserSingInMutation = usePostUserSignInMutation();

  const sendOtp = async (phone: string) => {
    const postAuthOtpMutationResponse = await postAuthOtpMutation.mutateAsync(
      { params: { phone } },
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            authForm.setError('phone', { message: error.response?.data?.reason });
          }
        }
      }
    );

    const retryDelay = postAuthOtpMutationResponse.data.retryDelay;

    setSubmittedPhones({
      ...submittedPhones,
      [phone]: Date.now() + retryDelay
    });

    return retryDelay;
  };

  const onRetry = () => sendOtp(phone);

  const onSubmit = authForm.handleSubmit(async (values) => {
    if (stage === 'phone' && 'phone' in values) {
      await sendOtp(phone);
      setStage('otp');
      return;
    }

    if (stage === 'otp' && 'otp' in values) {
      await postUserSingInMutation.mutateAsync(
        {
          params: { code: +authForm.getValues('otp'), phone: authForm.getValues('phone') }
        },
        {
          onError: (error) => {
            if (error instanceof AxiosError) {
              authForm.setError('otp', { message: error.response?.data?.reason });
            }
          },
          onSuccess: (response) => {
            localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, response.data.token);
            useStore.setState({ isLoggedIn: true, user: response.data.user });
          }
        }
      );
    }
  });

  return {
    form: authForm,
    state: { isLoading: authForm.formState.isSubmitting, stage, phone, submittedPhones },
    functions: { onSubmit, onRetry }
  };
};
