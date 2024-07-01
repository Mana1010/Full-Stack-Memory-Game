import asyncHandler from "express-async-handler";
import { Leaderboard } from "../model/leaderboard.model";
import { Response } from "express";
export const getLeaderboard = asyncHandler(async (_, res: Response) => {
  const getPlayer = await Leaderboard.find()
    .populate("profileId")
    .sort("-bestScore");
  if (!getPlayer) {
    res.status(200).json({ message: "No Player yet" });
    return;
  }
  res.status(200).json({ message: getPlayer });
  //Continue this tomorrow, will put the user_id here
});
