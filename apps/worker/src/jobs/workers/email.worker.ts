import { Worker } from 'bullmq';
import { logger } from '../../lib/logger.js';
import { redisConnection } from '../../lib/redis.js';
import { sendEmailHandler } from '../helpers/email.helper.js';

export const createEmailWorker = () => {
  const worker = new Worker(
    'email-queue',
    async (job) => {
      if (job.name === 'send-welcome-email') {
        return await sendEmailHandler(job.data);
      }
      throw new Error(`Unhandled job name: ${job.name}`);
    },
    {
      connection: redisConnection,
      concurrency: 5,
    },
  );

  worker.on('completed', (job) => {
    logger.info({ jobId: job.id, jobName: job.name }, `[Job ${job.id}] Completed: ${job.name}`);
  });

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, `[Job ${job?.id}] Failed with error: ${err.message}`);
  });

  return worker;
};
