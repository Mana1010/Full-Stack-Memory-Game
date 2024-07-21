import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

interface ILevel {
  level: string;
  isUnlock: boolean;
  highScore?: number;
}
const LevelSchema = new Schema({
  level: { type: String, required: true },
  isUnlock: { type: Boolean, required: true },
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
  },
  {
    timestamps: true,
  }
);
type UserSchema = mongoose.InferSchemaType<typeof schema>;
export const User = mongoose.model<UserSchema>("User", schema);
