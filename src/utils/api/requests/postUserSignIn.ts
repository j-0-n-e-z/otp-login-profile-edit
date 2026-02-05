import { api } from '@/utils/api/instance';

type PostUserSignInParams = SignInDto;
export type PostUserSignInRequestConfig = RequestConfig<PostUserSignInParams>;

export const postUserSignIn = ({ params, config }: PostUserSignInRequestConfig) =>
  api.post<SignInResponse>('auth/user', params, config);
