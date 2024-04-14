import { Request, Response } from "express";
import express from "express";
import { signUp } from "../controller/auth.controller";
export const router = express.Router();

router.route("/signup").post(signUp);
