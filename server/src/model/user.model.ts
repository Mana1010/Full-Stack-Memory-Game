import mongoose from "mongoose";

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
    setting: {
      playSound: {
        type: Boolean,
        default: true,
      },
      selectMusic: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);
type UserSchema = mongoose.InferSchemaType<typeof schema>;
export const User = mongoose.model<UserSchema>("User", schema);
