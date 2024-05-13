import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// registering user
const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    next(new AppError("User is already registered. Please try to log in", 404));
  }

  // validating email and password
  if (!validator.isEmail(email)) {
    return next(new AppError("Please enter valid email address", 404));
  }

  if (password.length < 8) {
    return next(new AppError("Please enter strong password", 404));
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  // creating and sending jwt to user
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
  });
});
// Login
const userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter email and password", 404));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Incorrect email or password"), 404);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return next(new AppError("Incorrect password. Please try again", 404));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

const adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("Invalid email or password", 404));
  }

  const user = await User.findOne({ email });

  if (!user) {
    next(new AppError("User not found! Please try again", 404));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    next(new AppError("Incorrect email or password! Please try again", 404));
  }

  if (req.body.role === "admin") {
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } else {
    res.status(404).json({
      status: "Authentication failed",
    });
  }
});

export { userLogin, signUp, adminLogin };
