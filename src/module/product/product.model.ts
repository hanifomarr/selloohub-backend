import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    description: String,
    stock: { type: Number, default: 0 },
    merchantId: { type: Number, require: true },
  },
  { timestamps: true },
);

export const Product = model('Product', productSchema);
