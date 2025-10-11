import { Router } from 'express';
import { merchantController } from './merchant.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { validateDto } from '@/middleware/validate-dto.middleware';
import { CreateMerchantDto } from '@/dto/merchant/create-merchant.dto';

const merchantRoute = Router();

merchantRoute.post(
  '/',
  authMiddleware,
  validateDto(CreateMerchantDto),
  merchantController.createMerchant,
);

export default merchantRoute;
