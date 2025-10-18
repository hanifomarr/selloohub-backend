import { authMiddleware } from '@/middleware/auth.middleware';
import { Router } from 'express';
import { productController } from './product.controller';
import { validate } from '@/middleware/validate';
import { CreateProductDto } from '@/dto/product/create-product.dto';

const productRoute = Router();

productRoute.post(
  '/',
  authMiddleware,
  validate(CreateProductDto),
  productController.createProduct,
);

export default productRoute;
