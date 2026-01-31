import { api } from '@/utils/api/instance';

type PostAuthOtpParams = CreateOtpDto;
export type PostAuthOtpRequestConfig = RequestConfig<PostAuthOtpParams>;

export const postAuthOtp = ({ params, config }: PostAuthOtpRequestConfig) =>
  api.post<OtpResponse>('auth/otp', params, config);
