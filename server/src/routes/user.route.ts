import express from "express";
import { verifyOldUser } from "../controller/user.controller";
import { protectedRoutes } from "../middleware/protected.route";
export const router = express.Router();

router.route("/verify").get(protectedRoutes, verifyOldUser);
router.get("/check", (req, res) => {
  res.send("Hello world");
});
