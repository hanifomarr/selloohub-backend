import express, { Request, Response } from "express";
import config from "@/config";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
