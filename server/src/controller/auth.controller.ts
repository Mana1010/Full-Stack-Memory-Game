import asyncHandler from "express-async-handler";
import { z } from "zod";
import bcrpyt from "bcrypt";
import { User } from "../model/user.model";
import { Request, Response } from "express";
import { accessToken, refreshToken } from "../utils/token.utils";
const schemaSignUp = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1).min(7),
    confirm: z.string().min(1),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"],
  });
const schemaLogIn = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
type SchemaSignUp = z.infer<typeof schemaSignUp>;
type SchemaLogIn = z.infer<typeof schemaLogIn>;
export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const validateForm = schemaSignUp.safeParse(req.body);
  if (!validateForm.success) {
    res.status(400);
    throw new Error("Please check your field and try again");
  }
  try {
    const hashedPassword = await bcrpyt.hash(password, 10);
    const createUser = await User.create({
      username,
      password: hashedPassword,
    });
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
        message: "Your account has been created successfully!",
        token: access_token,
      });
  } catch (err: any) {
    res.status(400).json({
      message:
        err.code === 11000
          ? "Username already exist"
          : "Failed to create your account",
    });
  }
});

export const logIn = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const validateForm = schemaLogIn.safeParse(req.body);
  if (!validateForm.success) {
    res.status(400);
    throw new Error("Please check your field and try again");
  }
  const authenticateUser = await User.findOne({ username });
  if (!authenticateUser) {
    res.status(401);
    throw new Error("Wrong Credentials");
  }
  const passwordCompare = await bcrpyt.compare(
    password,
    authenticateUser.password
  );

  if (!passwordCompare) {
    res.status(401);
    throw new Error("Wrong Credentials");
  }
  const refresh_token = refreshToken(authenticateUser._id.toString());
  const access_token = accessToken(authenticateUser._id.toString());
  res
    .status(200)
    .cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
    })
    .json({
      message: "Welcome back! You're now logged in.",
      token: access_token,
    });
});

// export const logOut = asyncHandler(async (req: Request, res: Response) => {});
