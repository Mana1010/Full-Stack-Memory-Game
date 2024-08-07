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
  claimReshufflePoints,
  getThreeCardsChallengeScore,
  getElementsChallengeScore,
  claimThreeCardsPoints,
  claimElementsPoints,
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
router.get("/three-cards-score", protectedRoutes, getThreeCardsChallengeScore);
router.get("/elements-score", protectedRoutes, getElementsChallengeScore);
router.patch("/easy/claim-prize/:id", protectedRoutes, claimEasyPoints);
router.patch("/medium/claim-prize/:id", protectedRoutes, claimMediumPoints);
router.patch("/hard/claim-prize/:id", protectedRoutes, claimHardPoints);
router.patch(
  "/reshuffle/claim-prize/:id",
  protectedRoutes,
  claimReshufflePoints
);
router.patch(
  "/three-cards/claim-prize/:id",
  protectedRoutes,
  claimThreeCardsPoints
);
router.patch("/elements/claim-prize/:id", protectedRoutes, claimElementsPoints);
