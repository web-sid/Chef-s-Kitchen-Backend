import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const auth = catchAsync(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return next(new AppError("Invalid token. Please try again", 404));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.body.userId = decode.id;
  next();
});

export default auth;
