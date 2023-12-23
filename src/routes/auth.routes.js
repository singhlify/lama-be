import { Router } from "express";
import { authenticateUser } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/login", authenticateUser);

export { authRouter };
