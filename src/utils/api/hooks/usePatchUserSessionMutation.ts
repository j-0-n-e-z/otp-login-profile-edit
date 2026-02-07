import { useMutation } from '@tanstack/react-query';

import type { PatchUserRequestConfig } from '../requests/patchUserSession';

import { patchUserSession } from '../requests/patchUserSession';

export const usePatchUserSessionMutation = (
  settings?: MutationSettings<PatchUserRequestConfig, typeof patchUserSession>
) =>
  useMutation({
    mutationKey: ['patchUserSession'],
    mutationFn: ({ params, config }) =>
      patchUserSession({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
