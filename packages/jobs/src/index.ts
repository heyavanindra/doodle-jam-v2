import { Queue, type QueueOptions, type ConnectionOptions, type RedisOptions } from 'bullmq';

export interface CreateEmailQueueOptions extends Partial<QueueOptions> {
  connection: ConnectionOptions;
}

export const createEmailQueue = (
  redisConfigOrOptions: ConnectionOptions | CreateEmailQueueOptions,
  options?: Partial<QueueOptions>,
) => {
  const isOptionsObject =
    'connection' in redisConfigOrOptions &&
    typeof (redisConfigOrOptions as CreateEmailQueueOptions).connection === 'object';

  const connection = isOptionsObject
    ? (redisConfigOrOptions as CreateEmailQueueOptions).connection
    : (redisConfigOrOptions as ConnectionOptions);

  const extraOptions = isOptionsObject
    ? (redisConfigOrOptions as CreateEmailQueueOptions)
    : options;

  return new Queue('email-queue', {
    ...extraOptions,
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
      ...extraOptions?.defaultJobOptions,
    },
  });
};

export type EmailQueue = ReturnType<typeof createEmailQueue>;
export { Queue, type QueueOptions, type ConnectionOptions, type RedisOptions };
