import { Request, Response } from 'express';

import Product from '@/models/product.model';
import asyncHandler from '@/middleware/asyncHandler';

// @desc View all products
// @route GET /api/v1/products
// @access Private (Admin)
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.json({
    status: 'success',
    data: {
      products,
    },
  });
});

export { getAllProducts };
