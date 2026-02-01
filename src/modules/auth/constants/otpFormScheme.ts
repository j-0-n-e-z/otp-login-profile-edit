import * as z from 'zod';

export const otpFormScheme = z.object({
  otp: z.string().min(0, 'Поле обязательно для заполнения').max(6)
});

export type OtpFormScheme = z.infer<typeof otpFormScheme>;
