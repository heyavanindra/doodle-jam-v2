import { type ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../lib/errors.js';
import { ZodError } from 'zod';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      status: 'fail',
      message: err.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default errorHandler;
