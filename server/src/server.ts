import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/auth.route";
import { router as userRouter } from "./routes/user.route";
import { errorHandle } from "./middleware/error.handling";
import { newAccessToken } from "./controller/auth.controller";
const app = express();
const PORT = process.env.PORT || 8080;
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.get("/", newAccessToken);

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
