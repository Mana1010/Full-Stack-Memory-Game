import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Profile {
  _id: string;
  age: number;
  gender: string;
  ign: string;
  profilePic: {
    secure_url: any;
    public_id: string;
  };
  updatedAt: Date;
  createdAt: string;
}
export interface User {
  _id: string;
  username: string;
  updatedAt: Date;
  createdAt: string;
}
export interface UserDetails<P = any, U = any> {
  bestScore: number;
  _id: string;
  profileId: P;
  userId: U;
  rank: number;
}

interface ScoreSchema {
  _id: string;
  isUnlock: boolean;
  isDone: boolean;
  highScore: number;
  totalScore: number;
}

export type LevelsSchema = ScoreSchema & { level: string };
export type ChallengesSchema = ScoreSchema & { challengeName: string };
