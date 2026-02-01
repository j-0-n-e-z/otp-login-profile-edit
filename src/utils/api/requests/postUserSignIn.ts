import { api } from '@/utils/api/instance';

type PostUserSignInParams = CreateUsersDto;
export type PostUserSignInRequestConfig = RequestConfig<PostUserSignInParams>;

export const postUserSignIn = ({ params, config }: PostUserSignInRequestConfig) =>
  api.post<UserSignInResponse>('auth/user', params, config);
