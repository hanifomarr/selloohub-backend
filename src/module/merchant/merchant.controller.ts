import { Response } from 'express';
import { AuthRequest } from '@/middleware/auth.middleware';
import { merchantService } from './merchant.service';
import { BaseController } from '@/core/base.controller';
import { ResponseMerchantDto } from '@/dto/merchant/response-merchant.dto';

class MerchantController extends BaseController {
  createMerchant = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const merchant = await merchantService.CreateMerchant(req.body, userId);

      return this.success(
        res,
        'Merchant created successfully',
        merchant,
        ResponseMerchantDto,
        201,
      );
    } catch (error: any) {
      return this.error(res, error.message, 400);
    }
  };
}

export const merchantController = new MerchantController();
