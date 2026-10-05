import { createRedisClient, type RedisOptions } from '@repo/redis';
import { env } from './env';
import logger from './logger';

const redisOptions: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  retryStrategy(times: number) {
    return Math.min(times * 50, 2000);
  },
};

export const redisClient = createRedisClient(redisOptions, logger);
