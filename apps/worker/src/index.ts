import { logger } from './lib/logger.js';
import { redisConnection } from './lib/redis.js';
import { createEmailWorker } from './jobs/workers/email.worker.js';

const emailWorker = createEmailWorker();
logger.info('Doodle Jam background worker booted and listening for jobs.');

const shutdown = async (signal: NodeJS.Signals) => {
  logger.info(`Received ${signal}. Shutting down worker gracefully...`);
  try {
    await emailWorker.close();
    await redisConnection.quit();
    logger.info('Worker shutdown completed successfully.');
    process.exit(0);
  } catch (err) {
    logger.error({ err }, 'Error during worker graceful shutdown');
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
