import * as z from 'zod';

import { MESSAGES } from './messages';

export const phoneFormScheme = z.object({
  phone: z.string().min(1, MESSAGES.REQUIRED).min(10, 'Номер должен состоять из 10 цифр')
});

export type PhoneFormScheme = z.infer<typeof phoneFormScheme>;
