import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import log from "./utils/logger";
dotenv.config();

import userRouter from "./routes/user.router";
import postRouter from "./routes/post.router";
import deserializeUser from "./middlewares/Deserializer";

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);

async function connectToDb() {
  const dbUri = process.env.DB_URI as string;

  try {
    await mongoose.connect(dbUri);
    log.info("Connected to DB");
  } catch (e) {
    process.exit(1);
  }
}

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
