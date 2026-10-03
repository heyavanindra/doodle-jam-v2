import { createAuthClient } from '@repo/auth/client';
import { env } from './env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API_URL,
});
