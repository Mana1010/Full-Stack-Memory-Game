import { protectedRoutes } from "../middleware/protected.route";
import {
  getLeaderboard,
  getLevels,
  createFeedback,
  getEasyScore,
  getMediumScore,
  getHardScore,
  claimEasyPoints,
  claimMediumPoints,
  claimHardPoints,
  getReshuffleChallengeScore,
} from "../controller/feature.controller";
import express from "express";

export const router = express.Router();

router.get("/leaderboard", protectedRoutes, getLeaderboard);
router.get("/levels", protectedRoutes, getLevels);
router.post("/feedback", protectedRoutes, createFeedback);
router.get("/easy-score", protectedRoutes, getEasyScore);
router.get("/medium-score", protectedRoutes, getMediumScore);
router.get("/hard-score", protectedRoutes, getHardScore);
router.get("/reshuffle-score", protectedRoutes, getReshuffleChallengeScore);
router.patch("/easy/claim-prize/:id", protectedRoutes, claimEasyPoints);
router.patch("/medium/claim-prize/:id", protectedRoutes, claimMediumPoints);
router.patch("/hard/claim-prize/:id", protectedRoutes, claimHardPoints);
