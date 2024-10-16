import express from "express";
import {
  createPostHandler,
  getAllPosts,
  deletePostHandler,
  editPostHandler,
  topPostThisWeek,
} from "../controllers/post.controller";
import validateResource from "../middlewares/validateResource";
import attachAuthorMiddleware from "../middlewares/AttachAuthor";
import { createPostSchema } from "../schemas/post.schema";
import { requireUser } from "../controllers/user.contoller";
import upload from "../utils/ImageUpload";
const router = express.Router();

router.post(
  "/create-post",
  requireUser,
  upload.array("img", 5),
  (req, res, next) => {
    console.log("Request body:", req.body);
    console.log("Files:", req.files);
    next();
  },
  validateResource(createPostSchema),
  attachAuthorMiddleware,
  createPostHandler
);
router.delete("/delete-post", requireUser, deletePostHandler);
router.put("/edit-post/:id", requireUser, editPostHandler);
router.get("/top-posts", topPostThisWeek);
router.get("/allposts", getAllPosts);
export default router;
