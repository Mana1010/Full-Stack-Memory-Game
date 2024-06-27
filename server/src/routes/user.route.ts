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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/profilepic");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
router.patch(
  "/profile/:id",
  upload.single("file"),
  protectedRoutes,
  editProfile
);
router
  .route("/profile")
  .get(protectedRoutes, getProfile)
  .post(protectedRoutes, profileUpload);
router.route("/edit-profile").get(protectedRoutes, showEditProfile);
router.route("/account-details").get(protectedRoutes, getAccountDetails);
