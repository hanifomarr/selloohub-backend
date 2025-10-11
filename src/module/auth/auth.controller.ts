import { Request, Response } from 'express';
import { authService } from './auth.service';
import { BaseController } from '@/core/base.controller';
import { ResponseUserDto } from '@/dto/auth/response-user.dto';

class AuthController extends BaseController {
  register = async (req: Request, res: Response) => {
    try {
      const newUser = await authService.Register(req.body);

      return this.success(
        res,
        'Merchant created successfully',
        newUser,
        ResponseUserDto,
        200,
      );
    } catch (error: any) {
      return this.error(res, error.message, 400);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = await authService.Login(req.body);
      return this.success(
        res,
        'User login successfully',
        user,
        ResponseUserDto,
      );
    } catch (error: any) {
      return this.error(res, error.message, 400);
    }
  };
}

export const authController = new AuthController();
