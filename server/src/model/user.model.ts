import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: {
      required: true,
      unique: true,
      type: String,
      default: "",
    },
    password: {
      required: true,
      type: String,
      default: "",
    },
    isOldUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
type UserSchema = mongoose.InferSchemaType<typeof schema>;
export const User = mongoose.model<UserSchema>("User", schema);
