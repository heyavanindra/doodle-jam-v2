import { createAuthClient as createBetterAuthClient } from 'better-auth/react';

export interface CreateAuthClientOptions {
  baseURL: string;
}

export function createAuthClient({ baseURL }: CreateAuthClientOptions) {
  return createBetterAuthClient({
    baseURL,
  });
}

export type AuthClient = ReturnType<typeof createAuthClient>;

export * from 'better-auth/cookies';
