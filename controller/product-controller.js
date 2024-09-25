const product = require("../db/models/product.js");
const asyncHandler = require("../middleware/asyncHandler");

// @desc   Create products
// @route  POST /api/product
// @access admin
const createProduct = asyncHandler(async (req, res) => {
  const body = req.body;
  const { id } = req.user;

  const newProduct = await product.create({
    name: body.name,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: id,
  });

  return res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

// @desc   View list of products
// @route  GET /api/product
// @access admin
const getAllProduct = asyncHandler(async (req, res, next) => {
  const result = await product.findAll();

  return res.json({
    status: "success",
    data: result,
  });
});

module.exports = { createProduct, getAllProduct };
