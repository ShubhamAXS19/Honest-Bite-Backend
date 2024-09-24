import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
