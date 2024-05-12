import express from "express";
import { protectedRoutes } from "../middleware/protected.route";
import {
  profileUpload,
  getProfile,
  editProfile,
  getAccountDetails,
} from "../controller/user.controller";
export const router = express.Router();

router
  .route("/profile")
  .get(protectedRoutes, getProfile)
  .post(protectedRoutes, profileUpload)
  .put(protectedRoutes, editProfile);
router.route("/account-details").get(protectedRoutes, getAccountDetails);
