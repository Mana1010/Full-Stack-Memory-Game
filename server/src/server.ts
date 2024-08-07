import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/auth.route";
import { router as userRouter } from "./routes/user.route";
import { router as featureRouter } from "./routes/feature.route";
import { errorHandle } from "./middleware/error.handling";
import { v2 as cloudinary } from "cloudinary";
const app = express();
const PORT = process.env.PORT || 8080;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://full-stack-memory-game.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/feature", featureRouter);
app.use(errorHandle);
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(PORT, () => {
      console.log("Server is listening...");
    });
  } catch (err) {
    console.log("Failed to connect");
  }
}
connectDb();
