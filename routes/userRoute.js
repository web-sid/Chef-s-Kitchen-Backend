import express from "express";
import {
  userLogin,
  signUp,
  adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);

export default userRouter;
