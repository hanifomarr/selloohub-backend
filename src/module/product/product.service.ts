import { CreateProductInput } from '@/dto/product/create-product.dto';
import { Product } from './product.model';
import { merchantRepo } from '@/repository/merchant.repository';

class ProductService {
  /**
   * Create a new product
   */
  async CreateProduct(data: CreateProductInput) {
    const merchantId = await merchantRepo.findOneBy({ id: data.merchantId });
    if (!merchantId) throw new Error('Merchant not found');

    const product = new Product(data);
    return await product.save();
  }
}

export const productService = new ProductService();
