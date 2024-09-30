import PostModel, { Post } from "../models/post.model";

export function createPost(input: Partial<Post>) {
  return PostModel.create(input);
}

export function getPost() {
  return PostModel.find({});
}

export function deletePost(id: string) {
  return PostModel.findByIdAndDelete(id);
}
