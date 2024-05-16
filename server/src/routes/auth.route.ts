import { Request, Response } from "express";
import express from "express";
import {
  signUp,
  logIn,
  newAccessToken,
  verifyOldUser,
  logOut,
} from "../controller/auth.controller";
import { protectedRoutes } from "../middleware/protected.route";
export const router = express.Router();
router.route("/refresh").get(newAccessToken);
router.route("/signup").post(signUp);
router.route("/login").post(logIn);
router.route("/logout").post(logOut);
router.route("/verify").get(protectedRoutes, verifyOldUser);
