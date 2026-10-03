import { randomUUID } from 'node:crypto';
import { StatusCodes } from 'http-status-codes';
import { pinoHttp } from 'pino-http';
import logger from '../lib/logger.js';

export const httpLogger = pinoHttp({
  logger,

  genReqId: (req, res) => {
    const requestId = req.headers['x-request-id'];

    if (typeof requestId === 'string') {
      res.setHeader('X-Request-Id', requestId);
      return requestId;
    }

    const id = randomUUID();

    res.setHeader('X-Request-Id', id);

    return id;
  },

  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) return 'error';
    if (res.statusCode >= StatusCodes.BAD_REQUEST) return 'warn';
    return 'info';
  },

  autoLogging: {
    ignore: (req) => Boolean(req.url === '/health' || req.url?.startsWith('/api/auth')),
  },
});
