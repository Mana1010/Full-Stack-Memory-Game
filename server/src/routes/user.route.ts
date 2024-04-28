import express from "express";

import { protectedRoutes } from "../middleware/protected.route";
export const router = express.Router();

router.get("/check", (req, res) => {
  res.send("Hello world");
});
