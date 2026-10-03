import { createRedisClient, type Redis, type RedisOptions } from '@repo/redis';
import { configs } from '../configs/configs.js';

export const redisConfig: RedisOptions = {
  host: configs.REDIS_HOST,
  port: configs.REDIS_PORT,
  password: configs.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  retryStrategy(times: number) {
    return Math.min(times * 50, 2000);
  },
};

export const redisConnection = createRedisClient(redisConfig);

export { Redis, type RedisOptions };
