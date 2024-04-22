import { Request, Response } from "express";
import express from "express";
import { signUp, logIn, newAccessToken } from "../controller/auth.controller";
export const router = express.Router();
router.route("/refresh").get(newAccessToken);
router.route("/signup").post(signUp);
router.route("/login").post(logIn);
