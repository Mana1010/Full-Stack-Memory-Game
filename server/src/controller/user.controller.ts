import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User } from "../model/user.model";
import { z } from "zod";
import path from "path";
const profileSchema = z.object({
  age: z.number(),
  gender: z.string(),
  ign: z.string().min(1),
  profilePic: z.string(),
});

type ProfileSchema = z.infer<typeof profileSchema>;
export const profileUpload = asyncHandler(
  async (req: Request, res: Response) => {
    const { age, gender, ign, profilePic }: ProfileSchema = req.body;
    // const validateData = profileSchema.safeParse(req.body);
    // if (!validateData.success) {
    //   res.status(400);
    //   throw new Error("Invalid data, please try again");
    // }
    const randomIcon = path.join(
      __dirname,
      "public",
      "images",
      `${profilePic}.png`
    );
    res.status(200).json({ message: randomIcon });
  }
);
