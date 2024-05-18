import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { User } from "../model/user.model";

export const protectedRoutes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;
    console.log(accessToken);
    if (!accessToken) {
      res.status(401).json("Unauthorized");
      return;
    }
    const token = accessToken?.split(" ")[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY!,
      async (err: Error | null, decode) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        } else {
          const decodedToken = decode as JwtPayload;
          req.user = await User.findById(decodedToken.id).select("-password");
          next();
        }
      }
    );
  }
);
