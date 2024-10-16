import { Request, Response } from "express";
import {
  getPostsStatsForWeek,
  getUsersWithNewFollowers,
  findPostsWithinDistance,
} from "../services/spot.service";

export async function shareSlice(req: Request, res: Response) {
  const {
    location,
    radius,
    people,
    crust,
    size,
    veg,
    nonveg,
    vegan,
    sauce,
    cheese,
  } = req.body;
  try {
  } catch (error) {}
}

export async function findNearbySpot(req: Request, res: Response) {
  console.log("Request Query:", req.query);
  try {
    const { lng, lat, distance } = req.query;
    const posts = await findPostsWithinDistance(
      Number(lng),
      Number(lat),
      Number(distance)
    );
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching nearby posts" });
  }
}

// Function to calculate the top creators based on different metrics
const getTopCreators = async () => {
  try {
    // Fetch stats from the database for the week
    const postsStats = await getPostsStatsForWeek();
    const usersStats = await getUsersWithNewFollowers();

    // Merge post stats and user stats for calculations
    const creatorStats = usersStats.map((user) => {
      const postStats =
        postsStats.find((post) => String(post._id) === String(user._id)) || {};

      return {
        ...user,
        postLikes: postStats.totalLikes || 0,
        postShares: postStats.totalShares || 0,
        postCount: postStats.postCount || 0,
        avgLikes: postStats.avgLikes || 0,
      };
    });

    // Calculate the score based on the weighted factors
    const topCreators = creatorStats
      .map((user) => ({
        ...user,
        score:
          user.avgLikes * 0.4 + // Likes are weighted higher
          user.newFollowers * 0.3 + // Followers weighted lower
          user.postShares * 0.2 + // Shares have some influence
          user.postCount * 0.1, // Post consistency matters but is weighted lowest
      }))
      .sort((a, b) => b.score - a.score) // Sort creators by score
      .slice(0, 7); // Return top 7 creators

    return topCreators;
  } catch (error) {}
};

export const getTopCreatorsOfTheWeek = async (req: Request, res: Response) => {
  try {
    const topCreators = await getTopCreators();
    res.status(200).json(topCreators);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error getting top creators of the week" });
  }
};

// export async function createPostHandler(
//   req: Request<{}, {}, CreatePostInput>,
//   res: Response
// ) {
//   try {
//     const userId = res.locals.user._id;

//     const files = (req.files as Express.MulterS3.File[]) || [];
//     const imageUrls = files.map((file) => file.location); // Get URLs of uploaded images from S3

//     const postData = {
//       img: imageUrls,
//       caption: req.body.caption,
//       location: req.body.location,
//       Dietary: req.body.Dietary,
//       Cuisine: req.body.Cuisine,
//       mealType: req.body.mealType,
//       tags: [req.body.Dietary, req.body.Cuisine, req.body.mealType],
//     };

//     const post = await createPost(postData, userId);
//     const savedPost = await finduserByIdAndUpdate(userId, post);
//     return res
//       .status(200)
//       .json({ msg: "Post created successfully", savedPost });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// }
