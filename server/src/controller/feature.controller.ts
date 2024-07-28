import asyncHandler from "express-async-handler";
import { Leaderboard } from "../model/leaderboard.model";
import { Response, Request } from "express";
import { User } from "../model/user.model";
import { Feedback } from "../model/feedback.model";
import { z } from "zod";
import { UserSchema } from "../model/user.model";

type UserIdSchema = Pick<UserSchema, "levels">;
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
    const getPlayers = await Leaderboard.find()
      .populate({ path: "profileId", select: ["profilePic.secure_url", "ign"] })
      .populate({ path: "userId", select: "_id" })
      .sort({ bestScore: -1 })
      .limit(50)
      .select("-username")
      .lean();
    if (getPlayers.length === 0) {
      res.status(200).json({ message: "No Player yet" });
      return;
    }
    res.status(200).json({
      message: {
        players: getPlayers,
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
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const validateFeedback = feedbackSchema.safeParse(req.body);
    if (!validateFeedback.success) {
      res.status(400);
      throw new Error("Please check your field and try again");
    }
    await Feedback.create({
      ...req.body,
      username: req.user?.username,
      userId: req.user?._id,
    });
    res.status(201).json({ message: "Thank you for your feedback" });
  }
);

export const getEasyScore = asyncHandler(
  async (req: Request, res: Response) => {
    const getAllTimeBest = await User.find()
      .select({
        levels: { $slice: [0, 1] }, //Filtering only the easy mode object
      })
      .sort({ "levels.highScore": -1 })
      .limit(1);
    const getPersonalScore = await User.findById(req.user?._id).select([
      "levels.highScore",
      "levels.totalScore",
      "-_id",
    ]);
    res.status(200).json({
      message: {
        allTimeBest: getAllTimeBest[0].levels[0].highScore,
        personalEasyScore: getPersonalScore?.levels[0],
      },
    });
  }
);

export const getMediumScore = asyncHandler(
  async (req: Request, res: Response) => {
    const getAllTimeBest = await User.find()
      .select({
        levels: { $slice: [1, 2] }, //Filtering only the medium mode object
      })
      .sort({ "levels.highScore": -1 })
      .limit(1);
    const getPersonalScore = await User.findById(req.user?._id).select([
      "levels.highScore",
      "levels.totalScore",
      "-_id",
    ]);
    res.status(200).json({
      message: {
        allTimeBest: getAllTimeBest[0].levels[1].highScore,
        personalMediumScore: getPersonalScore?.levels[1],
      },
    });
  }
);

export const getHardScore = asyncHandler(
  async (req: Request, res: Response) => {
    const getAllTimeBest = await User.find()
      .select({
        levels: { $slice: [2, 3] }, //Filtering only the hard mode object
      })
      .sort({ "levels.highScore": -1 })
      .limit(1);
    const getPersonalScore = await User.findById(req.user?._id).select([
      "levels.highScore",
      "levels.totalScore",
      "-_id",
    ]);
    res.status(200).json({
      message: {
        allTimeBest: getAllTimeBest[0].levels[2].highScore,
        personalEasyScore: getPersonalScore?.levels[2],
      },
    });
  }
);

export const claimEasyPoints = asyncHandler(
  async (req: Request, res: Response) => {
    const { points } = req.body;
    const { id } = req.params;
    const getUserLeaderboard = await Leaderboard.findOne({
      userId: id,
    });
    const getUser = await User.findById(req.user?._id);
    if (!getUser || !getUserLeaderboard) {
      res.status(404);
      throw new Error("User not found");
    }
    if (getUser) {
      getUser.levels[0].totalScore += points;
    }
    if (points > getUser.levels[0].highScore) {
      getUser.levels[0].highScore = points;
    }
    getUserLeaderboard.bestScore = (getUserLeaderboard.bestScore ?? 0) + points;
    await getUser.save();
    await getUserLeaderboard?.save();
    res.status(200).json({ message: "Successfully claimed your prize" });
  }
);
