import express from "express";
import { createPostHandler } from "../controllers/post.controller";
import validateResource from "../middlewares/validateResource";
import { createPostSchema } from "../schemas/post.schema";

const router = express.Router();

router.post(
  "/create-post",
  validateResource(createPostSchema),
  createPostHandler
);
router.delete("/delete-post", createPostHandler);
router.put("/edit-post", createPostHandler);
router.get("/get-post", createPostHandler);

export default router;
