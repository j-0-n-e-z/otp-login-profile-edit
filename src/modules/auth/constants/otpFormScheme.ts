import * as z from 'zod';

export const otpFormScheme = z.object({
  otp: z.string().min(1, 'Поле обязательно для заполнения').min(6, 'Код состоит из 6 цифр')
});

export type OtpFormScheme = z.infer<typeof otpFormScheme>;
