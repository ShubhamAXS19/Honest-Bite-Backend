import { prop, getModelForClass, Ref, index } from "@typegoose/typegoose";
import { User } from "./user.model";

@index({ location: "2dsphere" })
export class Post {
  @prop({ required: true })
  img: string[];

  @prop()
  caption?: string;

  @prop()
  name?: string;

  @prop({ required: true, type: () => [Number] })
  location: number[]; // [latitude, longitude] for consistency with common usage

  @prop({ default: 0 })
  likes: number;

  @prop({ type: () => [String], default: [] })
  comments: string[];

  @prop({ default: 0 })
  shares: number;

  @prop({ default: false })
  bookmarked: boolean;

  @prop()
  Dietary?: string;

  @prop()
  Cuisine?: string;

  @prop()
  mealType?: string;

  @prop({ type: () => [String], default: [] })
  tags: string[];

  @prop({ default: Date.now })
  createdAt: Date;

  @prop({ ref: () => "User" })
  Author?: Ref<User>;
}

const PostModel = getModelForClass(Post);

export default PostModel;
