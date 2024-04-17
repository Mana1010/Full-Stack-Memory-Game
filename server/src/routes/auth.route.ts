import { Request, Response } from "express";
import express from "express";
import { signUp, logIn } from "../controller/auth.controller";
export const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(logIn);
