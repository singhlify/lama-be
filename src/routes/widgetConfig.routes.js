import { Router } from "express";

const widgetConfigRouter = Router();

widgetConfigRouter.get("/", getWidgetConfigByProjectId);
widgetConfigRouter.put("/update", updateWidgetConfig);

export { widgetConfigRouter };
