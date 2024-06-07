import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product-model.js";

// @desc   Fetch list of products
// @route  GET /api/product
// @access public
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc   Fetch a product
// @route  GET /api/product/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export { getProduct, getProductById };
