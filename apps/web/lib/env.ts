import { createEnv } from '@t3-oss/env-nextjs';
import { appEnv, webClientEnv } from '@repo/env';

export function createWebEnv(runtimeEnv: Record<string, string | undefined> = process.env) {
  return createEnv({
    server: {
      NODE_ENV: appEnv.shape.NODE_ENV,
    },
    client: {
      NEXT_PUBLIC_API_URL: webClientEnv.shape.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_WEB_URL: webClientEnv.shape.NEXT_PUBLIC_WEB_URL,
      NEXT_PUBLIC_WS_URL: webClientEnv.shape.NEXT_PUBLIC_WS_URL,
    },
    experimental__runtimeEnv: {
      NEXT_PUBLIC_API_URL: runtimeEnv.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_WEB_URL: runtimeEnv.NEXT_PUBLIC_WEB_URL,
      NEXT_PUBLIC_WS_URL: runtimeEnv.NEXT_PUBLIC_WS_URL,
    },
    emptyStringAsUndefined: true,
  });
}

export const env = createWebEnv();
export type WebEnv = typeof env;
