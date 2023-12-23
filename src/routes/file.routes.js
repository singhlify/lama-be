import { Router } from "express";
import {
  createFile,
  deleteFile,
  getAllFiles,
  getFileById,
  updateFile,
} from "../controllers/file.controllers.js";

const fileRouter = Router();

fileRouter.get("/all", getAllFiles);
fileRouter.get("/:fileId", getFileById);
fileRouter.post("/create", createFile);
fileRouter.put("/update", updateFile);
fileRouter.delete("/delete", deleteFile);

export { fileRouter };
