import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "2mb",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the LAMA Demo project",
  });
});

// routes
import {
  authRouter,
  fileRouter,
  projectRouter,
  userRouter,
  widgetConfigRouter,
} from "./src/routes/index.js";
import { authMiddleware } from "./src/middlewares/index.js";

const apiV1 = "/api/v1";
app.use(`${apiV1}/auth`, authRouter);
app.use(`${apiV1}/user`, authMiddleware, userRouter);
app.use(`${apiV1}/project`, authMiddleware, projectRouter);
app.use(`${apiV1}/file`, authMiddleware, fileRouter);
app.use(`${apiV1}/widgetConfig`, authMiddleware, widgetConfigRouter);

export { app };
