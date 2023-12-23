import { Router } from "express";
import { updateUser, logoutUser } from "../controllers/index.js";
import { getUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.put("/update", updateUser);
userRouter.post("/logout", logoutUser);

export { userRouter };
