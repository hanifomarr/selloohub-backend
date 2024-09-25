const express = require("express");
const {
  createProduct,
  getAllProduct,
} = require("../controller/product-controller");
const { authentication, restrictTo } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(authentication, restrictTo("1"), createProduct)
  .get(authentication, restrictTo("1"), getAllProduct);

module.exports = router;
