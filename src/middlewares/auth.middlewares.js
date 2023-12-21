export const authMiddleware = (req, res, next) => {
  try {
    const userId = req.cookies.userId || req.body.userId || req.query.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    next();
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
