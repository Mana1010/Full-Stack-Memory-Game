import { protectedRoutes } from "../middleware/protected.route";
import { getLeaderboard, getLevels } from "../controller/feature.controller";
import express from "express";

export const router = express.Router();

router.get("/leaderboard", protectedRoutes, getLeaderboard);
router.get("/levels", protectedRoutes, getLevels);
