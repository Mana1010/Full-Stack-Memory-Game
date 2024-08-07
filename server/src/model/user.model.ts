import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const LevelSchema = new Schema({
  level: { type: String, required: true },
  isUnlock: { type: Boolean, required: true },
  isDone: { type: Boolean, default: false },
  highScore: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
});
const ChallengeSchema = new Schema({
  challengeName: { type: String, required: true },
  isUnlock: { type: Boolean, required: true },
  isDone: { type: Boolean, default: false },
  highScore: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
});
const schema = new mongoose.Schema(
  {
    username: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    isOldUser: {
      type: Boolean,
      default: false,
    },
    levels: [LevelSchema],
    challenges: [ChallengeSchema],
  },
  {
    timestamps: true,
  }
);
export type UserSchema = mongoose.InferSchemaType<typeof schema>;
export const User = mongoose.model<UserSchema>("User", schema);
