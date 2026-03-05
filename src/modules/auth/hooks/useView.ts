import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { usePostAuthOtpMutation } from '@/utils/api/hooks/usePostAuthOtpMutation';
import { usePostUserSignInMutation } from '@/utils/api/hooks/usePostUserSignInMutation';
import { useStore, useToken } from '@/utils/store';

import type { OtpFormScheme } from '../schemas/otpFormScheme';
import type { PhoneFormScheme } from '../schemas/phoneFormScheme';

import { otpFormScheme } from '../schemas/otpFormScheme';
import { phoneFormScheme } from '../schemas/phoneFormScheme';

export const useView = () => {
  const [stage, setStage] = useState<'otp' | 'phone'>('phone');
  const [submittedPhones, setSubmittedPhones] = useState<{ [key: string]: number }>({});

  const authForm = useForm<OtpFormScheme | PhoneFormScheme>({
    mode: 'onTouched',
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
    const postAuthOtpMutationResponse = await postAuthOtpMutation.mutateAsync({
      params: { phone }
    });

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
      const postUserSignInMutationResponse = await postUserSingInMutation.mutateAsync({
        params: { code: +authForm.getValues('otp'), phone: authForm.getValues('phone') }
      });

      if (!postUserSignInMutationResponse.data.success) {
        authForm.setError('otp', { message: postUserSignInMutationResponse.data?.reason });
        return;
      }

      useToken.setState({ token: postUserSignInMutationResponse.data.token });
      useStore.setState({ isLoggedIn: true, user: postUserSignInMutationResponse.data.user });
    }
  });

  return {
    form: authForm,
    state: { isLoading: authForm.formState.isSubmitting, stage, phone, submittedPhones },
    functions: { onSubmit, onRetry }
  };
};
