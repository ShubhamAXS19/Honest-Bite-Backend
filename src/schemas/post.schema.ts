import { object, array, string, number, boolean, z } from "zod";

export const createPostSchema = object({
  body: object({
    img: array(string())
      .nonempty({ message: "At least one image is required" })
      .max(10, { message: "Maximum 10 images allowed" }),
    caption: string().optional(),
    name: string().optional(),
    location: object({
      type: z.literal("Point"),
      coordinates: array(number())
        .length(2, { message: "Location must be [longitude, latitude]" })
        .refine(
          ([lng, lat]) => lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
          { message: "Invalid coordinates" }
        ),
    }),
    likes: number().nonnegative().optional().default(0),
    comments: array(string()).optional().default([]),
    shares: number().nonnegative().optional().default(0),
    bookmarked: boolean().optional().default(false),
    Dietary: string().optional(),
    Cuisine: string().optional(),
    mealType: string().optional(),
    tags: array(string()).optional().default([]),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>["body"];
