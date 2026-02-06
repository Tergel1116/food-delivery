import cors from "cors";
import { configDotenv } from "dotenv";
import express, { Application, Request, Response } from "express";
import { userRouter } from "./routers";

import connectToMongoDB from "./mongodb";
// import { cartRouter, foodRouter } from "./routers";

configDotenv();

const app: Application = express();

app.use(cors());
app.use(express.json());

const port = 8000;

// app.use("/foods", foodRouter);
// app.use("/foods-cart", cartRouter);
app.use("/users", userRouter);

app.listen(port, async () => {
  await connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});
