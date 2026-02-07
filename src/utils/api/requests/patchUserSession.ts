import { api } from '@/utils/api/instance';

type PatchUserSessionParams = UpdateProfileDto
export type PatchUserRequestConfig = RequestConfig<PatchUserSessionParams>;

export const patchUserSession = ({ params, config }: PatchUserRequestConfig) =>
  api.patch<UpdateProfileResponse>('user/patch', params, config);
