import asyncHandler from "express-async-handler";
import { Leaderboard } from "../model/leaderboard.model";
import { Response, Request } from "express";
import { User } from "../model/user.model";
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

// export const creatingFeedback = asyncHandler(async(req: Request, res: Response) => {
//   const
// })
