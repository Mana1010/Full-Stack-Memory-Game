import mongoose from "mongoose";
import { Schema } from "mongoose";
import { InferSchemaType } from "mongoose";
const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
    name: {
      type: String,
      required: true,
    },
    rating: {
      ui: Number,
      ux: Number,
      performance: Number,
    },
    improvement: {
      type: String,
      default: "",
    },
    bugs: {
      type: String,
      default: "",
    },
    scale: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

type FeedbackSchema = mongoose.InferSchemaType<typeof feedbackSchema>;
export const Feedback = mongoose.model<FeedbackSchema>(
  "Feedback",
  feedbackSchema
);
