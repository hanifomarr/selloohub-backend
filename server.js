require("dotenv").config();
const express = require("express");
const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");

const port = process.env.PORT;
const app = express();


app.get("/", (req, res) => {
  res.send("API is running");
});


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
