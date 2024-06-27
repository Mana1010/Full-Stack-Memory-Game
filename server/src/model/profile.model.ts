import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema(
  {
    ign: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: [1, "Age is minimum at 1"],
      max: [150, "Age is maximum at 150"],
    },
    gender: {
      type: String,
      required: true,
      default: "male",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    profilePic: {
      secure_url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
type ProfileSchema = mongoose.InferSchemaType<typeof schema>;
export const Profile = mongoose.model<ProfileSchema>("Profile", schema);
