export const responseHandler = ({
  res,
  statusCode = 200,
  message = "Success",
  data = null,
}) => {
  res.status(statusCode).json({ message, data });
};

export const errorHandler = ({
  res,
  error = "Something went Wrong",
  statusCode = 500,
}) => {
  return res.status(statusCode).json({
    error,
  });
};
