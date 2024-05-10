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
});
