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
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("users", schema);
