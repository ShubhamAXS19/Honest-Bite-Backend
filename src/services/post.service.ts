import PostModel, { Post } from "../models/post.model";
import { subDays } from "date-fns";

export function createPost(input: Partial<Post>, userId: string) {
  const newPost = new PostModel({ ...input, Author: userId });
  return newPost.save();
}

export function getPost() {
  return PostModel.find({});
}

export function deletePost(id: string) {
  return PostModel.findByIdAndDelete(id);
}

export function getPostById(id: string) {
  return PostModel.findById(id);
}

export function updatePostById(id: string, input: Partial<Post>) {
  return PostModel.findByIdAndUpdate(id, input, { new: true });
}

export function topPost() {
  // Calculate the date 7 days ago
  const lastWeek = subDays(new Date(), 7);

  // Find posts created in the last week, sort by likes and shares, and limit the result
  return PostModel.find({
    createdAt: { $gte: lastWeek.toISOString() }, // Only posts from the last 7 days
  })
    .sort({ likes: -1, shares: -1 }) // Sort by likes first, then shares
    .limit(5); // Limit to 5 posts
}
