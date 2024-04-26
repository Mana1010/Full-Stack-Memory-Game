import { Request, Express } from "express";
import { Types } from "mongoose";

interface User {
  username?: string;
  password?: string;
  _id?: Types.ObjectId;
  isOldUser?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user: User | null;
    }
  }
}

export {};
