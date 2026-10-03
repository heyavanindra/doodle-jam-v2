import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

export const validateBody = (schema: ZodType): RequestHandler => {
  return (req, _res, next) => {
    req.validatedBody = schema.parse(req.body);
    next();
  };
};

export const validateParams = (schema: ZodType): RequestHandler => {
  return (req, _res, next) => {
    req.validatedParams = schema.parse(req.params);
    next();
  };
};

export const validateQuery = (schema: ZodType): RequestHandler => {
  return (req, _res, next) => {
    req.validatedQuery = schema.parse(req.query);
    next();
  };
};
