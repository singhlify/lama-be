import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: String,
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
