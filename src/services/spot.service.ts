import PostModel from "../models/post.model";
import UserModel from "../models/user.model";
import { startOfWeek, endOfWeek } from "date-fns";

// Function to get posts stats for the current week
export const getPostsStatsForWeek = async () => {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);

  const posts = await PostModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: weekStart,
          $lte: weekEnd,
        },
      },
    },
    {
      $group: {
        _id: "$Author",
        totalLikes: { $sum: "$likes" },
        totalShares: { $sum: "$shares" },
        postCount: { $sum: 1 },
        avgLikes: { $avg: "$likes" },
      },
    },
  ]);

  return posts;
};

// Function to get users with new followers count
export const getUsersWithNewFollowers = async () => {
  const users = await UserModel.aggregate([
    {
      $project: {
        email: 1,
        firstName: 1,
        lastName: 1,
        newFollowers: 1, // Assume we are tracking new followers elsewhere
      },
    },
  ]);

  return users;
};

export async function findPostsWithinDistance(
  lng: number,
  lat: number,
  maxDistanceInMeters: number
) {
  return PostModel.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat], // MongoDB expects [longitude, latitude]
        },
        $maxDistance: maxDistanceInMeters,
      },
    },
  });
}
