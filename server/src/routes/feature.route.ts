import { protectedRoutes } from "../middleware/protected.route";
import { getLeaderboard } from "../controller/feature.controller";
import express from "express";

export const router = express.Router();

router.get("/leaderboard", protectedRoutes, getLeaderboard);
// router.get("/setting");
