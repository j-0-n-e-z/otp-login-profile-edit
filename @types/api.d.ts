/* eslint-disable perfectionist/sort-interfaces */
interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig;
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey'
  >;
}

type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };

interface BaseResponse {
  message: string;
}

interface CreateOtpDto {
  phone: string;
}

interface SignInDto {
  code: number;
  phone: string;
}

interface OtpResponse extends BaseResponse {
  reason?: string;
  retryDelay: number;
  success: boolean;
}

interface SignInResponse extends BaseResponse {
  user: User;
  token: string
}

interface SessionResponse extends BaseResponse {
  user: User
}

interface User {
  phone: string
  firstname?: string
  middlename?: string
  lastname?: string
  email?: string
  city?: string
}