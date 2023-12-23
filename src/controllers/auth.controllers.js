import { User } from "../models/index.js";
import { responseHandler, errorHandler } from "../utils/index.js";

const cookieConfig = {
  httpOnly: true,
  secure: true,
};

export const authenticateUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.cookie("userId", existingUser._id, cookieConfig);
      return responseHandler({
        res,
        message: "User Found",
        data: {
          userId: existingUser._id,
          fullName: existingUser.fullName,
          email: existingUser.email,
        },
      });
    }

    const newUser = await User.create({ fullName, email });

    res.cookie("userId", newUser._id, cookieConfig);
    return responseHandler({
      res,
      statusCode: 201,
      message: "Created New User",
      data: {
        userId: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};
