import { protectedRoutes } from "../middleware/protected.route";
import {
  getLeaderboard,
  getLevels,
  createFeedback,
  getEasyScore,
  getMediumScore,
  claimEasyPoints,
  claimMediumPoints,
} from "../controller/feature.controller";
import express from "express";

export const router = express.Router();

router.get("/leaderboard", protectedRoutes, getLeaderboard);
router.get("/levels", protectedRoutes, getLevels);
router.post("/feedback", protectedRoutes, createFeedback);
router.get("/easy-score", protectedRoutes, getEasyScore);
router.get("/medium-score", protectedRoutes, getMediumScore);
router.patch("/easy/claim-prize/:id", protectedRoutes, claimEasyPoints);
router.patch("/medium/claim-prize/:id", protectedRoutes, claimMediumPoints);
