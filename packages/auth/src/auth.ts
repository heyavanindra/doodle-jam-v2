import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { type Database } from '@repo/db/client';
import { authSchema } from '@repo/db/schema';

export interface CreateAuthOptions {
  db: Database;
  secret: string;
  baseURL: string;
  trustedOrigins?: string[];
  sendEmail: ({
    to,
    subject,
    url,
  }: {
    to: string;
    subject: string;
    url: string;
  }) => Promise<void> | void;
}

export function createAuth({ db, secret, baseURL, trustedOrigins, sendEmail }: CreateAuthOptions) {
  return betterAuth({
    secret: secret,
    baseURL: baseURL,
    trustedOrigins,
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }, request) => {
        await sendEmail({
          to: user.email,
          subject: 'Verify your email address',
          url,
        });
      },
      sendOnSignUp: true,
    },
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: {
        user: authSchema.user,
        session: authSchema.session,
        account: authSchema.account,
        verification: authSchema.verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      autoSignIn: false,
    },
  });
}

export type AuthInstance = ReturnType<typeof createAuth>;
