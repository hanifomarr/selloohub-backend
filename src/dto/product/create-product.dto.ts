import z from 'zod';

export const CreateProductDto = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be positive number'),
  description: z.string().optional(),
  stock: z.number().min(0, 'Stock cannot be negative').default(0),
  merchantId: z.coerce.number().min(1, 'Merchant ID is required'),
});

export type CreateProductInput = z.infer<typeof CreateProductDto>;
