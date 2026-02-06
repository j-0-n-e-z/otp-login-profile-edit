import { useMutation } from '@tanstack/react-query';

import type { PostUserSignInRequestConfig } from '../requests/postUserSignIn';

import { postUserSignIn } from '../requests/postUserSignIn';

export const usePostUserSignInMutation = (
  settings?: MutationSettings<PostUserSignInRequestConfig, typeof postUserSignIn>
) =>
  useMutation({
    mutationKey: ['postUserSignIn'],
    mutationFn: ({ params, config }) =>
      postUserSignIn({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
