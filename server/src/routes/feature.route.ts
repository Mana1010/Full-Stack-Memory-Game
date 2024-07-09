import { protectedRoutes } from "../middleware/protected.route";
import {
  getLeaderboard,
  getLevels,
  createFeedback,
  changeSetting,
  getSetting,
} from "../controller/feature.controller";
import express from "express";

export const router = express.Router();

router.get("/leaderboard", protectedRoutes, getLeaderboard);
router.get("/levels", protectedRoutes, getLevels);
router.post("/feedback", protectedRoutes, createFeedback);
router
  .route("/setting")
  .get(protectedRoutes, getSetting)
  .patch(protectedRoutes, changeSetting);
