import express from "express";
import { protectedRoutes } from "../middleware/protected.route";
import { profileUpload } from "../controller/user.controller";
export const router = express.Router();

router.route("/profile").post(profileUpload);
