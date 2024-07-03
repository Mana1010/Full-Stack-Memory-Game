import asyncHandler from "express-async-handler";
import { Leaderboard } from "../model/leaderboard.model";
import { Response, Request } from "express";
export const getLeaderboard = asyncHandler(
  async (req: Request, res: Response) => {
    const getPlayer = await Leaderboard.find()
      .populate({ path: "profileId", select: ["profilePic.secure_url", "ign"] })
      .populate({ path: "userId", select: "_id" })
      .sort({ bestScore: -1 })
      .limit(50)
      .lean()
      .select("-username");
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
