import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product-model.js";
import User from "./models/user-model.js";
import Order from "./models/order-model.js";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);

    console.log("Data imported success");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else importData();
