import mongoose from "mongoose";

const widgetConfigSchema = new mongoose.Schema(
  {
    general: {
      chatBotName: String,
      welcomeMessage: String,
      inputPlaceholder: String,
    },
    display: {
      botProp: {
        primaryColor: String,
        fontColor: String,
        fontSize: String,
        chatHeight: String,
        showSources: String,
      },
      chatIconProp: {
        iconSize: String,
        screenPosition: String,
        bottomDistance: String,
        horizontalDistance: String,
        botIcon: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const WidgetConfig = mongoose.model("WidgetConfig", widgetConfigSchema);
