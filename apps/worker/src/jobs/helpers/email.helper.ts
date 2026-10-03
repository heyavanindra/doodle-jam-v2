import { logger } from '../../lib/logger.js';

export interface SendEmailPayload {
  to: string;
  name?: string;
  subject?: string;
  body?: string;
  [key: string]: unknown;
}

export const sendEmailHandler = async (data: SendEmailPayload) => {
  logger.info({ to: data.to, subject: data.subject }, 'Processing send email job...');

  await new Promise((resolve) => setTimeout(resolve, 500));

  logger.info({ to: data.to }, 'Email sent successfully');

  return {
    success: true,
    to: data.to,
    sentAt: new Date().toISOString(),
  };
};

export default sendEmailHandler;
