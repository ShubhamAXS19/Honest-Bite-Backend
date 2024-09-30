import { object, TypeOf, array, string, number, boolean } from "zod";

export const createPostSchema = object({
  body: object({
    img: array(
      string({
        required_error: "Image is required",
      })
    ).nonempty(),
    caption: string(),
    location: string({
      required_error: "location is required",
    }),
    likes: number().nonnegative(),
    comments: array(string()),
    shares: number().nonnegative(),
    bookmarked: boolean(),
    Dietary: array(string()),
    Cuisine: array(string()),
    mealType: array(string()),
    tags: array(string()),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
