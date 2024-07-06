import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
});
