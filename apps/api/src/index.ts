import type { Server } from 'node:http';
import app from './app.js';
import { configs } from './configs/configs.js';
import { pool } from './lib/db.js';
import { redisConnection } from './lib/redis.js';
import logger from './lib/logger.js';
import { printBanner } from './utils/banner.js';

let server: Server;

async function connectDependencies() {
  logger.info('Connecting to database...');
  await pool.query('SELECT 1');
  logger.info('Connected to database successfully');

  logger.info('Connecting to Redis...');
  await redisConnection.ping();
  logger.info('Connected to Redis successfully');
}

async function startServer() {
  try {
    await connectDependencies();

    server = app.listen(configs.PORT, () => {
      printBanner({ port: configs.PORT, env: configs.NODE_ENV, startedAt: Date.now() });
    });
  } catch (err) {
    logger.fatal({ err }, 'Failed to start server');
    process.exit(1);
  }
}

async function shutdown(signal: NodeJS.Signals) {
  logger.info(`${signal} received: starting graceful drain...`);

  const forceKillTimeout = setTimeout(() => {
    logger.error('Graceful shutdown timed out. Forcing termination.');
    process.exit(1);
  }, 10000);

  forceKillTimeout.unref();

  try {
    if (server) {
      if (typeof server.closeIdleConnections === 'function') {
        server.closeIdleConnections();
      }

      await new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
      logger.info('HTTP server closed: all in-flight requests finished.');
    }

    await pool.end();
    logger.info('Database connections drained and closed.');

    await redisConnection.quit();
    logger.info('Redis connection closed.');

    process.exit(0);
  } catch (err) {
    logger.error({ err }, 'Error encountered during shutdown');
    process.exit(1);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer();
