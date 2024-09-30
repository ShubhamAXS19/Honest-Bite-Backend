import { Request, Response } from "express";
import { createPost, getPost, deletePost } from "../services/post.service";
import { CreatePostInput } from "../schemas/post.schema";

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) {
  const body = req.body;
  try {
    const post = await createPost(body);
    return res.json({ msg: "Post created successfully", post });
  } catch (e: any) {
    return res.status(500);
  }
}

export async function getPostHandler(req: Request, res: Response) {
  try {
    const post = await getPost();
    return res.json(post);
  } catch (e: any) {
    return res.status(500);
  }
}

export async function deletePostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await deletePost(id);
    return res.json("Post deleted successfully");
  } catch (e: any) {
    return res.status(500);
  }
}
