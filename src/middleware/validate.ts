import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: JSON.parse(error.message),
      });
    }
  };
