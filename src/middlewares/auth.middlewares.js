import { errorHandler } from "../utils/index.js";
import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.cookies.userId || req?.headers?.authorization || null;

    if (!userId) {
      return errorHandler({
        res,
        error: "Unauthorized",
        statusCode: 401,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return errorHandler({
        res,
        error: "Unauthorized",
        statusCode: 401,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error>>>", error);
    errorHandler({
      res,
      error: "Something went wrong",
    });
  }
};
