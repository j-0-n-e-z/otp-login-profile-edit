import { useMutation } from '@tanstack/react-query';

import type { PostAuthOtpRequestConfig } from '../requests/postAuthOtp';

import { postAuthOtp } from '../requests/postAuthOtp';

export const usePostAuthOtpMutation = (
  settings?: MutationSettings<PostAuthOtpRequestConfig, typeof postAuthOtp>
) =>
  useMutation({
    mutationKey: ['postAuthOtp'],
    mutationFn: ({ params, config }) =>
      postAuthOtp({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
