import { Request, Response } from "express";
import {
  createPost,
  getPost,
  deletePost,
  getPostById,
  updatePostById,
  topPost,
} from "../services/post.service";
import { findUserById, findUserByIdAndUpdate } from "../services/user.service";
import { CreatePostInput } from "../schemas/post.schema";
export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const files = (req.files as Express.MulterS3.File[]) || [];
    const imageUrls = files.map((file) => file.location); // Get URLs of uploaded images from S3

    const postData = {
      ...req.body,
      img: imageUrls,
      tags: [req.body.Dietary, req.body.Cuisine, req.body.mealType].filter(
        (tag): tag is string => tag !== undefined
      ), // Filter out undefined tags
      location: req.body.location.coordinates,
    };

    const post = await createPost(postData, userId);
    const savedPost = await findUserByIdAndUpdate(userId, post);
    return res
      .status(200)
      .json({ msg: "Post created successfully", savedPost });
  } catch (error) {
    console.error("Error in createPostHandler:", error);
    return res.status(500).send(error);
  }
}

// import PostModel from "./post.model"; // Adjust the import paths as necessary
// import UserModel from "./user.model";

// export async function createPostHandler(req: Request, res: Response) {
//   try {
//     const userId = res.locals.user._id; // Get user ID from request context

//     // Create a new post
//     const newPost = new PostModel({
//       img: req.body.img,
//       caption: req.body.caption,
//       location: req.body.location,
//       Author: userId, // Assign the user ID as the Author
//       // Include any other fields needed
//     });

//     // Save the new post to the database
//     const savedPost = await newPost.save();

//     // Push the saved post's ID into the user's posts array
//     await UserModel.findByIdAndUpdate(
//       userId,
//       { $push: { posts: savedPost._id } },
//       { new: true } // Option to return the updated document
//     );

//     // Return the saved post or a success message
//     return res.status(201).json(savedPost);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     return res.status(500).json({ error: "Could not create post" });
//   }
// }

export async function deletePostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await deletePost(id);
    return res.json("Post deleted successfully");
  } catch (e: any) {
    return res.status(500);
  }
}

export async function editPostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await getPostById(id);
    if (!post) {
      return res.status(404).json("Post not found");
    }
    // update post
    const body = req.body;
    const updatedPost = await updatePostById(id, { ...body });

    return res.json(updatedPost);
  } catch (e: any) {
    return res.status(500);
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await getPost();
    return res.json(posts);
  } catch (e: any) {
    return res.status(500);
  }
}

export async function topPostThisWeek(req: Request, res: Response) {
  try {
    const topPosts = await topPost();
    console.log(topPosts);
    return res.json(topPosts);
  } catch (error) {
    return res.json(error);
  }
}
