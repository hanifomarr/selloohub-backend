import { Router } from 'express';
import { getAllProducts } from '@/controllers/product.controller';

const productRoutes = Router();

productRoutes.route('/').get(getAllProducts);

export default productRoutes;
