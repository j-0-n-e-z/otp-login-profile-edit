import * as z from 'zod';

import { MESSAGES } from '@/modules/auth/constants/messages';

export const otpFormScheme = z.object({
  otp: z.string().min(1, MESSAGES.REQUIRED).min(6, 'Код состоит из 6 цифр')
});

export type OtpFormScheme = z.infer<typeof otpFormScheme>;
