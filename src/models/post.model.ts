import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Post {
  @prop({ required: true })
  img: string[];

  @prop()
  caption: string;

  @prop({ required: true })
  location: string;

  @prop()
  likes: number;

  @prop()
  comments: string[];

  @prop()
  shares: number;

  @prop()
  bookmarked: boolean;

  @prop()
  Dietary: string[];

  @prop()
  Cuisine: string[];

  @prop()
  mealType: string[];

  @prop()
  tags: string[];

  @prop({ ref: "User" })
  user: Ref<User>;
}

const PostModel = getModelForClass(Post);

export default PostModel;
