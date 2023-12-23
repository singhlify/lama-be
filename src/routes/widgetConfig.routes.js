import { Router } from "express";
import {
  getWidgetConfigByProjectId,
  updateWidgetConfig,
  uploadBotIcon,
} from "../controllers/index.js";
import { upload } from "../middlewares/index.js";

const widgetConfigRouter = Router();

widgetConfigRouter.get("/", getWidgetConfigByProjectId);
widgetConfigRouter.put("/update", updateWidgetConfig);
widgetConfigRouter.post("/upload", upload.single("image"), uploadBotIcon);

export { widgetConfigRouter };
