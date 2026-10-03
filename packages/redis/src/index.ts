import { Redis, type RedisOptions } from 'ioredis';

type Logger = {
  info: (msg: string) => void;
  error: ({ err }: { err: Error }, msg: string) => void;
};

export const createRedisClient = (redisConfig: RedisOptions, logger?: Logger): Redis => {
  const client = new Redis(redisConfig);

  client.on('connect', () => {
    logger?.info('Connected to Redis successfully');
  });

  client.on('error', (err) => {
    logger?.error({ err }, 'Redis connection error');
  });

  return client;
};

export { Redis, type RedisOptions };
