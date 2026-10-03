import { StatusCodes } from 'http-status-codes';

interface AppErrorInterface {
  statusCode: number;
  message: string;
  status: string;
  cause?: Error;
}

export class AppError extends Error implements AppErrorInterface {
  statusCode: number;
  message: string;
  status: string;
  cause?: Error;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
