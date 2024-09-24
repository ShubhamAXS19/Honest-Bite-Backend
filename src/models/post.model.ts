import { prop } from "@typegoose/typegoose";

export class Post {
  @prop({ required: true })
  img: string[];

  @prop()
  caption: string;

  @prop({ required: true })
  location: string;

  @prop({ required: true })
  date: string;

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

  @prop({ required: true })
  userId: number;
}

export default Post;
