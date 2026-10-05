import { Queue, type QueueOptions, type ConnectionOptions, type RedisOptions } from 'bullmq';

export const createEmailQueue = (connection: ConnectionOptions, options?: QueueOptions) =>
  new Queue('email-queue', {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
    },
    ...options,
  });

export type EmailQueue = ReturnType<typeof createEmailQueue>;
export { Queue, type QueueOptions, type ConnectionOptions, type RedisOptions };
