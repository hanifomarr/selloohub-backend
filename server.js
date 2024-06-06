import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product-route.js";

dotenv.config();
connectDB();

const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/product", productRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
