import * as z from 'zod';

import { MESSAGES } from '@/modules/auth/constants/messages';

export const profileFormScheme = z.object({
  firstname: z.string().min(1, MESSAGES.REQUIRED),
  middlename: z.string(),
  lastname: z.string().min(1, MESSAGES.REQUIRED),
  email: z.email('Некорректный email'),
  city: z.string().min(1, MESSAGES.REQUIRED)
});

export type ProfileFormScheme = z.infer<typeof profileFormScheme>;
