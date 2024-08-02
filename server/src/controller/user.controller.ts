import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { User } from "../model/user.model";
import { z } from "zod";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { Profile } from "../model/profile.model";
import { Leaderboard } from "../model/leaderboard.model";
import {
  uploadFileCloudinary,
  deleteFileCloudinary,
} from "../utils/cloudinary.utils";
const profileSchema = z.object({
  age: z.number().min(1).max(150),
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
      await Leaderboard.create({
        bestScore: 0,
        userId: req.user?._id,
        profileId: createProfile.id,
      });
      const getUser = await User.findById(req.user?._id);
      if (!getUser) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      getUser.levels = [
        { level: "EASY", isUnlock: true },
        { level: "MEDIUM", isUnlock: false },
        { level: "HARD", isUnlock: false },
      ] as any;
      getUser.challenges = [
        {
          challengeName: "RESHUFFLE",
          isUnlock: false,
        },
        {
          challengeName: "3-CARDS",
          isUnlock: false,
        },
        {
          challengeName: "ELEMENTS",
          isUnlock: false,
        },
      ] as any;
      getUser.isOldUser = !req.user?.isOldUser;
      createProfile.userId = req.user?._id;
      await createProfile.save();
      await getUser?.save();
      if (!createProfile) {
        res.status(400);
        throw new Error("Error!!");
      }
      res.status(201).json({ message: "Success" });
    } catch (err: any) {
      res.status(400).json({
        message: err.code === 11000 ? "IGN already exist" : err,
      });
    }
  }
);

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const getProfile = await Leaderboard.findOne({
    userId: req.user?._id,
  })
    .populate({
      path: "profileId",
      select: ["profilePic.secure_url", "ign"],
    })
    .populate({
      path: "userId",
      select: ["username"],
    })
    .select(["-__v", "-updatedAt"])
    .lean();
  if (!getProfile) {
    res.status(404);
    throw new Error("User not found");
  }
  const getAllPlayers = await Leaderboard.find()
    .sort({ bestScore: -1 })
    .limit(50)
    .select(["userId"]);
  const getIndex = getAllPlayers.findIndex((player) =>
    player.userId?.equals(req.user?._id)
  );
  res.status(200).json({ message: { ...getProfile, rank: getIndex + 1 } });
});
export const getAccountDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const findUser = await User.findOne({ username: username }).select("id");
    if (!findUser) {
      res.status(404);
      throw new Error("username not found");
    }
    const getAccountDetails = await Leaderboard.findOne({
      userId: findUser?.id,
    })
      .populate("userId")
      .populate("profileId")
      .select(["-isOldUser", "-__v", "-password"])
      .lean();
    if (!getAccountDetails) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const getAllPlayers = await Leaderboard.find()
      .sort({ bestScore: -1 })
      .limit(50)
      .select(["bestScore", "userId"]);
    const getIndex = getAllPlayers.findIndex((player) =>
      player.userId?.equals(req.user?._id)
    ); //To determine and display which rank the user is placed.
    res
      .status(200)
      .json({ message: { ...getAccountDetails, rank: getIndex + 1 } });
  }
);
export const showEditProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const getProfile = await Profile.findOne({ userId: req.user?._id })
      .populate({ path: "userId", select: "username" })
      .select(["ign", "age", "profilePic.secure_url"]);
    if (!getProfile) {
      res.status(404);
      throw new Error("User not found");
    }
    res.status(200).json({ message: getProfile });
  }
);
export const editProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { age, ign, file } = req.body;
  const getProfile = (await Profile.findById(id).populate({
    path: "userId",
    select: "username",
  })) as any;
  if (!getProfile) {
    res.status(404);
    throw new Error("User not found");
  }
  if (getProfile.profilePic && (req.file || file !== "null")) {
    let upload;
    if (req.file) {
      upload = await uploadFileCloudinary(req.file.path);
    } else {
      const randomIcon = path.join(
        __dirname,
        "..",
        "public",
        "images",
        `${file}.png`
      );
      upload = await uploadFileCloudinary(randomIcon);
    }
    if (getProfile.profilePic.public_id) {
      await deleteFileCloudinary([getProfile.profilePic.public_id]);
    }
    getProfile.profilePic.public_id = upload.public_id;
    getProfile.profilePic.secure_url = upload.secure_url;
  }

  if (age && getProfile.age !== age) getProfile.age = age;
  if (ign && getProfile.ign !== ign) getProfile.ign = ign;
  await getProfile.save();
  res.status(201).json({
    message: {
      content: "Profile updated successfully.",
      username: getProfile?.userId,
    },
  });
});
