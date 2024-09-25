require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth-route.js");
const productRouter = require("./routes/product-route.js");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
