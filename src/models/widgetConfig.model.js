import mongoose from "mongoose";

const widgetConfigSchema = new mongoose.Schema(
  {
    general: {
      chatBotName: { type: String, default: "" },
      welcomeMessage: { type: String, default: "" },
    },
    display: {
      botProp: {
        primaryColor: { type: String, default: "" },
        fontColor: { type: String, default: "" },
        fontSize: { type: String, default: "" },
        chatHeight: { type: String, default: "" },
        showSources: { type: String, default: "" },
      },
      chatIconProp: {
        iconSize: { type: String, default: "" },
        screenPosition: { type: String, default: "" },
        bottomDistance: { type: String, default: "" },
        horizontalDistance: { type: String, default: "" },
        botIcon: { type: Object, default: "" },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const WidgetConfig = mongoose.model("WidgetConfig", widgetConfigSchema);
