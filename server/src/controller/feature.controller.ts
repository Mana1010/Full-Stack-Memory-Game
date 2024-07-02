import asyncHandler from "express-async-handler";
import { Leaderboard } from "../model/leaderboard.model";
import { Response, Request } from "express";
export const getLeaderboard = asyncHandler(
  async (req: Request, res: Response) => {
    const getPlayer = await Leaderboard.find()
      .populate(["profileId", "userId"])
      .sort("-bestScore");
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
