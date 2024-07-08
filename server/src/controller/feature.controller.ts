import asyncHandler from "express-async-handler";
import { Leaderboard } from "../model/leaderboard.model";
import { Response, Request } from "express";
import { User } from "../model/user.model";
import { Feedback } from "../model/feedback.model";
import { z } from "zod";
const feedbackSchema = z.object({
  name: z.string().min(1),
  rating: z.object({
    ui: z.number().min(1).max(5),
    ux: z.number().min(1).max(5),
    performance: z.number().min(1).max(5),
  }),
  improvement: z.string().optional(),
  bugs: z.string().optional(),
  scale: z.string().min(1),
});
export const getLeaderboard = asyncHandler(
  async (req: Request, res: Response) => {
    const getPlayer = await Leaderboard.find()
      .populate({ path: "profileId", select: ["profilePic.secure_url", "ign"] })
      .populate({ path: "userId", select: "_id" })
      .sort({ bestScore: -1 })
      .limit(50)
      .select("-username")
      .lean();
    if (!getPlayer) {
      res.status(200).json({ message: "No Player yet" });
      return;
    }
    res.status(200).json({
      message: {
        players: getPlayer,
        userId: req.user?._id,
      },
    });
  }
);

export const getLevels = asyncHandler(async (req: Request, res: Response) => {
  const getLevels = await User.findById(req.user?._id).select("levels");
  if (!getLevels) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: getLevels });
});

export const createFeedback = asyncHandler(
  async (req: Request, res: Response) => {
    const validateFeedback = feedbackSchema.safeParse(req.body);
    if (!validateFeedback.success) {
      res.status(400);
      throw new Error("Please check your field and try again");
    }
    const createFeedback = await Feedback.create({
      ...req.body,
      username: req.user?.username,
    });
    createFeedback.userId = req.user?._id;
    await createFeedback.save();
    res.status(201).json({ message: "Thank you for your feedback" });
  }
);
