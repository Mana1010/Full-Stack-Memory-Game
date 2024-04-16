import asyncHandler from "express-async-handler";
import { string, z } from "zod";
import bcrpyt from "bcrypt";
import { User } from "../model/user.model";
import { Request, Response } from "express";
import { accessToken, refreshToken } from "../utils/token.utils";
const schema = z
  .object({
    username: z.string().min(1, "This field is required"),
    password: z
      .string()
      .min(1, "This field is required")
      .min(7, "Password must be at least 7 characters long."),
    confirm: z.string().min(1, "This field is required"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });
type UserSchema = z.infer<typeof schema>;
export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, confirm } = req.body;
  //   if(!schema.parse(req.body)) {
  //    res.status(400);
  //    throw new Error()
  //   }
  try {
    await bcrpyt.hash(password, 10);
    const createUser = await User.create({ username, password });
    const refresh_token = refreshToken(createUser._id.toString());
    const access_token = accessToken(createUser._id.toString());
    res
      .status(201)
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: true,
      })
      .json({
        message: "Condragulation, you're a winner baby",
        token: access_token,
      });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "Sashay Away, you're a winner baby" });
  }
});
