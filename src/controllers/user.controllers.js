import { errorHandler, responseHandler } from "../utils/index.js";

const cookieConfig = {
  httpOnly: true,
  secure: true,
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return responseHandler({
      res,
      data: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const fullName = req.body?.fullName;
    const user = req.user;
    
    if (fullName) {
      user.fullName = fullName;
    }
    const updatedUser = await user.save();

    return responseHandler({
      res,
      data: {
        fullName: updatedUser.fullName,
      },
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("userId", cookieConfig);
    return responseHandler({
      res,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("error>>>", error);
    return errorHandler({
      res,
      error: error?.response,
    });
  }
};
