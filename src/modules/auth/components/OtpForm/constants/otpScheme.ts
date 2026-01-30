import * as z from 'zod';

export const otpScheme = z.object({
  phone: z.string().min(1, {
    message: 'Поле обязательно для заполнения'
  })
});

export type OtpScheme = z.infer<typeof otpScheme>;
