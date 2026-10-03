import type { Session, User } from '@repo/auth';

declare global {
  namespace Express {
    interface Request {
      validatedBody: unknown;
      validatedParams: unknown;
      validatedQuery: unknown;
      user?: User;
      session?: Session;
    }
  }
}

export {};
