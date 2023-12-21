import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    widgetConfig: { type: mongoose.Schema.Types.ObjectId, ref: "WidgetConfig" },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
