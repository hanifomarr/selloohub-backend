import { BaseController } from '@/core/base.controller';
import { Request, Response } from 'express';
import { productService } from './product.service';

class ProductController extends BaseController {
  createProduct = async (req: Request, res: Response) => {
    try {
      const product = await productService.CreateProduct(req.body);
      return res.status(201).json({ message: 'Product create', data: product });
    } catch (error: any) {
      return this.error(res, error.message, 400);
    }
  };
}

export const productController = new ProductController();
