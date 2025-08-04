import { model, Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const productSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      ref: 'User', // owner/merchant/admin who created the product
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  },
);

export default model('Product', productSchema);
