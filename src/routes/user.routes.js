import { Router } from "express";
import {
  authenticateUser,
  updateUser,
  logoutUser,
} from "../controllers/index.js";
import { getUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/login", authenticateUser);
userRouter.put("/update", updateUser);
userRouter.post("/logout", logoutUser);

export { userRouter };
