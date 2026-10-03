import { createAuth } from '@repo/auth';
import { configs } from '../configs/configs.js';
import { db } from './db.js';
import { sendEmail } from '../utils/sendEmail.js';

export const auth = createAuth({
  db,
  secret: configs.BETTER_AUTH_SECRET,
  baseURL: configs.BETTER_AUTH_URL,
  trustedOrigins: [configs.FRONTEND_URL],
  sendEmail,
});

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
