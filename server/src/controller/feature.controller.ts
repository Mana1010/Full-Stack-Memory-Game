import asyncHandler from "express-async-handler";
import { Leaderboard } from "../model/leaderboard.model";
import { Response, Request } from "express";
import { User } from "../model/user.model";
import { Feedback } from "../model/feedback.model";
import { z } from "zod";
import { UserSchema } from "../model/user.model";

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
  const getLevels = await User.findById(req.user?._id).select([
    "levels",
    "challenges",
  ]);
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
      .sort({ "levels.totalScore": -1 })
      .limit(1);
    const getPersonalScore = await User.findById(req.user?._id).select([
      "levels.highScore",
      "levels.totalScore",
      "-_id",
    ]);
    res.status(200).json({
      message: {
        allTimeBest: getAllTimeBest[0].levels[0].totalScore,
        personalEasyScore: getPersonalScore?.levels[0], //Will retrieve the easy level properties
      },
    });
  }
);

export const getMediumScore = asyncHandler(
  async (req: Request, res: Response) => {
    const getAllTimeBest = await User.find()
      .select({
        levels: { $slice: [1, 1] }, //Filtering only the easy mode object
      })
      .sort({ "levels.totalScore": -1 })
      .limit(1);
    const getPersonalScore = await User.findById(req.user?._id).select([
      "levels.highScore",
      "levels.totalScore",
      "-_id",
    ]);
    res.status(200).json({
      message: {
        allTimeBest: getAllTimeBest[0].levels[0].totalScore,
        personalMediumScore: getPersonalScore?.levels[1], //Will retrieve the medium level properties
      },
    });
  }
);

export const getHardScore = asyncHandler(
  async (req: Request, res: Response) => {
    const getAllTimeBest = await User.find()
      .select({
        levels: { $slice: [2, 2] }, //Filtering only the hard mode object
      })
      .sort({ "levels.totalScore": -1 })
      .limit(1);
    const getPersonalScore = await User.findById(req.user?._id).select([
      "levels.highScore",
      "levels.totalScore",
      "-_id",
    ]);
    console.log(getAllTimeBest[0].levels[0].totalScore);
    res.status(200).json({
      message: {
        allTimeBest: getAllTimeBest[0].levels[0].totalScore,
        personalHardScore: getPersonalScore?.levels[2], //Will retrieve the hard level properties
      },
    });
  }
);
export const getReshuffleChallengeScore = asyncHandler(
  async (req: Request, res: Response) => {
    const getAllTimeBest = await User.find()
      .select({
        challenges: { $slice: [0, 1] }, //Filtering only the reshuffle challenge mode object
      })
      .sort({ "challenges.totalScore": -1 })
      .limit(1);
    const getPersonalScore = await User.findById(req.user?._id).select([
      "challenges.highScore",
      "challenges.totalScore",
      "-_id",
    ]);
    console.log(getPersonalScore?.challenges[0]);
    res.status(200).json({
      message: {
        allTimeBest: getAllTimeBest[0].challenges[0].totalScore,
        personalReshuffleScore: getPersonalScore?.challenges[0], //Will retrieve the reshuffle properties
      },
    });
  }
);

export const claimEasyPoints = asyncHandler(
  async (req: Request, res: Response) => {
    const { points, isGameComplete } = req.body;
    const { id } = req.params;
    const getUserLeaderboard = await Leaderboard.findOne({
      userId: id,
    });
    const getUser = await User.findById(req.user?._id);
    const isAlreadyUnlockMedium = getUser?.levels[1].isUnlock; //Checking if the medium level is already unlock
    if (!getUser || !getUserLeaderboard) {
      res.status(404);
      throw new Error("User not found");
    }
    const getLevelEasy = getUser.levels[0];
    if (getUser) {
      getLevelEasy.totalScore += points;
    }
    if (points > getLevelEasy.highScore) {
      getLevelEasy.highScore = points;
    }
    getUserLeaderboard.bestScore = (getUserLeaderboard.bestScore ?? 0) + points;
    if (isGameComplete && !isAlreadyUnlockMedium) {
      getUser.levels[1].isUnlock = true; // Will unlock the medium level
    }
    await getUser.save();
    await getUserLeaderboard?.save();
    res.status(200).json({ message: "Successfully claimed your prize" });
  }
);

export const claimMediumPoints = asyncHandler(
  async (req: Request, res: Response) => {
    const { points, isGameComplete } = req.body;
    const { id } = req.params;
    const getUserLeaderboard = await Leaderboard.findOne({
      userId: id,
    });
    const getUser = await User.findById(req.user?._id);
    const isAlreadyUnlockHard = getUser?.levels[2].isUnlock; //Checking if the hard level is already unlock
    const isAlreadyUnlockReshuffle = getUser?.challenges[0].isUnlock; //Checking if the reshuffle level is already unlock
    if (!getUser || !getUserLeaderboard) {
      res.status(404);
      throw new Error("User not found");
    }
    const getLevelMedium = getUser.levels[1];
    if (getUser) {
      getLevelMedium.totalScore += points;
    }
    if (points > getLevelMedium.highScore) {
      getLevelMedium.highScore = points;
    }
    getUserLeaderboard.bestScore = (getUserLeaderboard.bestScore ?? 0) + points;
    if (isGameComplete && !isAlreadyUnlockHard && !isAlreadyUnlockReshuffle) {
      getUser.levels[2].isUnlock = true; // Will unlock the hard level
      getUser.challenges[0].isUnlock = true; //Will unlock the reshuffle challenge mode
    }
    await getUser.save();
    await getUserLeaderboard?.save();
    res.status(200).json({ message: "Successfully claimed your prize" });
  }
);

export const claimHardPoints = asyncHandler(
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
    const getLevelHard = getUser.levels[2];
    if (getUser) {
      getLevelHard.totalScore += points;
    }
    if (points > getLevelHard.highScore) {
      getLevelHard.highScore = points;
    }
    getUserLeaderboard.bestScore = (getUserLeaderboard.bestScore ?? 0) + points;
    await getUser.save();
    await getUserLeaderboard?.save();
    res.status(200).json({ message: "Successfully claimed your prize" });
  }
);

export const claimReshufflePoints = asyncHandler(
  async (req: Request, res: Response) => {
    const { points } = req.body;
    const { id } = req.params;
    const getUserLeaderboard = await Leaderboard.findOne({
      userId: id,
    });
    console.log("Running asf");
    const getUser = await User.findById(req.user?._id);
    if (!getUser || !getUserLeaderboard) {
      res.status(404);
      throw new Error("User not found");
    }
    const getReshuffle = getUser.challenges[0]; //Retrieving the reshuffle obj from the challenges array
    if (getUser) {
      getReshuffle.totalScore += points;
    }
    if (points > getReshuffle.highScore) {
      getReshuffle.highScore = points;
    }
    getUserLeaderboard.bestScore = (getUserLeaderboard.bestScore ?? 0) + points;
    await getUser.save();
    await getUserLeaderboard?.save();
    res.status(200).json({ message: "Successfully claimed your prize" });
  }
);
