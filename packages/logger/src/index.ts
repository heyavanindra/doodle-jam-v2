import pino, { type Logger, type LoggerOptions } from 'pino';

export const createLogger = (nodeEnv: string, options?: LoggerOptions): Logger => {
  const isProduction = nodeEnv === 'production';
  const level = options?.level || (isProduction ? 'info' : 'debug');

  return pino({
    level,
    ...(!isProduction && {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    }),
    ...options,
  });
};

export { type Logger, type LoggerOptions };
