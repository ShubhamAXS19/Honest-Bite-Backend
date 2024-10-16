import { startOfMonth, subMonths, startOfYear } from "date-fns";
import PostModel from "../models/post.model";

const Analytics = async function (Author: string) {
  const now = new Date();
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastYearStart = startOfYear(subMonths(now, 12));

  // Aggregate likes for the last month, split into weeks
  const lastMonthLikes = await PostModel.aggregate([
    {
      $match: {
        createdAt: { $gte: lastMonthStart, $lt: now },
        // author: Author, // Add author filter if needed
      },
    },
    {
      $group: {
        _id: {
          week: {
            $switch: {
              branches: [
                { case: { $lte: [{ $dayOfMonth: "$createdAt" }, 7] }, then: 1 },
                {
                  case: { $lte: [{ $dayOfMonth: "$createdAt" }, 14] },
                  then: 2,
                },
                {
                  case: { $lte: [{ $dayOfMonth: "$createdAt" }, 21] },
                  then: 3,
                },
                {
                  case: { $lte: [{ $dayOfMonth: "$createdAt" }, 28] },
                  then: 4,
                },
              ],
              default: 4, // Assign remaining days to week 4
            },
          },
        },
        totalLikes: { $sum: "$likes" },
      },
    },
    {
      $sort: { "_id.week": 1 },
    },
  ]);

  // Aggregate likes for the last year split by month
  const lastYearLikes = await PostModel.aggregate([
    {
      $match: {
        createdAt: { $gte: lastYearStart, $lt: now },
        // author: Author, // Add author filter if needed
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalLikes: { $sum: "$likes" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Create an array with all 4 weeks, defaulting to 0 if no data exists
  const weeklyData = Array.from({ length: 4 }, (_, i) => {
    const weekData = lastMonthLikes.find((week) => week._id.week === i + 1);
    return {
      name: `Week ${i + 1}`,
      value: weekData ? weekData.totalLikes : 0,
    };
  });

  const data = {
    month: weeklyData,
    year: lastYearLikes.map((month) => ({
      name: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        new Date(0, month._id - 1)
      ),
      value: month.totalLikes,
    })),
  };

  return data;
};

export default Analytics;
