import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { Clerk } from "@clerk/clerk-sdk-node";
import cookieParser from "cookie-parser";

const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const app = express();
const PORT = process.env.PORT || 8080;
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

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
