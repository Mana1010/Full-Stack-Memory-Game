import express from "express";
import { protectedRoutes } from "../middleware/protected.route";
import multer from "multer";
import {
  profileUpload,
  getProfile,
  editProfile,
  getAccountDetails,
  showEditProfile,
} from "../controller/user.controller";
export const router = express.Router();

router
  .route("/profile")
  .get(protectedRoutes, getProfile)
  .post(protectedRoutes, profileUpload);
router.patch("/profile:id", protectedRoutes, editProfile);
router.route("/edit-profile").get(protectedRoutes, showEditProfile);
router.route("/account-details").get(protectedRoutes, getAccountDetails);
