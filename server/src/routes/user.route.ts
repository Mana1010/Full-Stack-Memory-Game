import express from "express";
import { protectedRoutes } from "../middleware/protected.route";
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
  .post(protectedRoutes, profileUpload)
  .put(protectedRoutes, editProfile);

router.route("/edit-profile").get(protectedRoutes, showEditProfile);
router.route("/account-details").get(protectedRoutes, getAccountDetails);
