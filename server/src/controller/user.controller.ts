import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User } from "../model/user.model";

export const verifyOldUser = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const findUser = await User.findById(req.user._id);
    if (!findUser) {
      res.status(401);
      throw new Error("Unathorized");
    }
    if (findUser.isOldUser) {
      res.status(200).json({ message: true });
      return;
    }
    res.status(200).json({ message: false });
  }
);
