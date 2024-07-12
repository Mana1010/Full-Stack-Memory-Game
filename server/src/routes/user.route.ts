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
interface CB {
  error: Error;
  acceptFile: boolean;
}
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  // Reject files with a mimetype other than 'image/png' or 'image/jpeg'
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/profilepic");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, fileFilter });
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
