import { Resend } from 'resend';
import { configs } from '../configs/configs.js';
import { logger } from '../lib/logger.js';
import { renderVerifyEmailHtml } from '@repo/transactional';

type SendEmailParams = {
  to: string;
  subject: string;
  url: string;
};

const resend = new Resend(configs.RESEND_API_KEY);

export async function sendEmail({ to, subject, url }: SendEmailParams): Promise<void> {
  const html = await renderVerifyEmailHtml({ url, name: to });
  const { error } = await resend.emails.send({
    from: 'Doodle Jam <onboarding@resend.dev>',
    to: [to],
    subject,
    html,
  });

  if (error) {
    logger.error({ err: error, to, subject }, 'Failed to send email');
    throw error;
  }
}
