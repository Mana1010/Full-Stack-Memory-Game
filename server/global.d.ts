import { Types } from "mongoose";

interface User {
  username?: string;
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
