import * as z from 'zod';

export const otpScheme = z.object({
  phone: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .min(10, 'Номер должен состоять из 10 цифр')
});

export type OtpScheme = z.infer<typeof otpScheme>;
