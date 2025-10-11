import { Response } from 'express';
import { plainToInstance } from 'class-transformer';

export abstract class BaseController {
  protected success<T>(
    res: Response,
    message: string,
    data: T,
    dtoClass?: new (...args: any[]) => object,
    statusCode = 200,
  ) {
    const responseData = dtoClass
      ? plainToInstance(dtoClass, data, { excludeExtraneousValues: true })
      : data;

    return res.status(statusCode).json({
      status: 'success',
      code: statusCode,
      message,
      data: responseData,
    });
  }

  protected error(res: Response, message: string, statusCode = 400) {
    return res.status(statusCode).json({
      status: 'error',
      code: statusCode,
      message,
    });
  }
}
