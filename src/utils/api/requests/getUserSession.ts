import { api } from '@/utils/api/instance';

export type GetUserSessionRequestConfig = RequestConfig | void;

export const getUserSession = (requestConfig?: GetUserSessionRequestConfig) =>
  api.get<SessionResponse>('user/session', requestConfig?.config);
