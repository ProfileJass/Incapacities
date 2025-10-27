import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

export const validateParam = (schema: ZodSchema, paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params[paramName]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid parameter',
          errors: error.errors.map((err) => ({
            path: paramName,
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
