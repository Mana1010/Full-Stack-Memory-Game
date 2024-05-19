import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema({
  bestScore: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  profileId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
  },
  username: {
    type: String,
    default: "",
  },
});
type LeaderBoardSchema = mongoose.InferSchemaType<typeof schema>;

export const Leaderboard = mongoose.model<LeaderBoardSchema>(
  "Leaderboard",
  schema
);
