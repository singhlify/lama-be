import { Router } from "express";
import { createProject,getAllProjects } from "../controllers/index.js";

const projectRouter = Router();

projectRouter.post("/create", createProject);
projectRouter.get("/all", getAllProjects);

export { projectRouter };
