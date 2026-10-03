import rateLimit from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';

const TIME_WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 100;

export const limiter = rateLimit({
  windowMs: TIME_WINDOW_MS,
  limit: LIMIT,
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
  message: {
    status: 'fail',
    message: 'Too many requests, please try again later.',
  },
  skip: (req) => req.path === '/health',
});
