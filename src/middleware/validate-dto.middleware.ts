import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    console.log("🚀 ~ validateDto ~ dtoInstance:", dtoInstance)
    const error = await validate(dtoInstance);

    if (error.length > 0) {
      const formatedError = error
        .map((err) => {
          return Object.values(err.constraints || {});
        })
        .flat();

      return res.status(400).json({ status: 'error', error: formatedError });
    }

    // If valid, attach validated DTO to req.body
    req.body = dtoInstance;
    console.log("🚀 ~ validateDto ~ req.body:", req.body)
    next();
  };
};
