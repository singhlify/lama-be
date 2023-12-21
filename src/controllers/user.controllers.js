import { User } from "../models/index.js";

const cookieConfig = {
  httpOnly: true,
  secure: true,
};

export const authenticateUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.cookie("userId", existingUser._id, cookieConfig).json({
        userId: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
      });
    }

    const newUser = await User.create({ fullName, email });

    return res.cookie("userId", newUser._id, cookieConfig).json({
      userId: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.cookies.userId || req.body.userId || req.query.userId;
    const { fullName, avatar } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (avatar) {
      user.avatar = avatar;
    }
    const updatedUser = await user.save();

    res.json({
      fullName: updatedUser.fullName,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.cookies.userId || req.body.userId || req.query.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).clearCookie("userId", cookieConfig).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
