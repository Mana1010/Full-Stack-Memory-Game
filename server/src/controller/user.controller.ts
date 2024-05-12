import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User } from "../model/user.model";
import { z } from "zod";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { Profile } from "../model/profile.model";
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
    const validateData = profileSchema.safeParse(req.body);
    if (!validateData.success) {
      res.status(400);
      throw new Error("Invalid data, please try again");
    }
    const randomIcon = path.join(
      __dirname,
      "..",
      "public",
      "images",
      `${profilePic}.png`
    );
    try {
      const uploadResponse = await cloudinary.uploader.upload(randomIcon, {
        folder: "memory-game/profile-picture",
        upload_preset: "yxnopucd",
      });
      const createProfile = await Profile.create({
        age,
        gender,
        ign,
        profilePic: {
          secure_url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
        },
      });
      const getUser = await User.findById(req.user?._id);
      if (!getUser) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      getUser.isOldUser = !getUser.isOldUser;
      createProfile.userId = req.user?._id;
      await createProfile.save();
      await getUser?.save();
      if (!createProfile) {
        res.status(400);
        throw new Error("Error!!");
      }
      res.status(200).json({ message: "Success" });
    } catch (err: any) {
      res.status(400);
      console.log(err);
      throw new Error(err);
    }
  }
);

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const getProfile = await Profile.findOne({
    userId: req.user?._id,
  })
    .select(["-__v", "-updatedAt"])
    .lean();
  if (!getProfile) {
    res.status(400);
    throw new Error("User is not defined yet");
  }
  res.status(200).json({ message: getProfile });
});
export const getAccountDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const getAccountDetails = await Profile.findOne({
      userId: req.user?._id,
    })
      .populate("userId")
      .select(["-__v", "-updatedAt"])
      .lean();
  }
);

export const editProfile = asyncHandler(
  async (req: Request, res: Response) => {}
);
