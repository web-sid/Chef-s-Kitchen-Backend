import express from "express";
import auth from "../middleware/auth.js";
import {
  addCart,
  removeCart,
  getCartData,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", auth, addCart);
cartRouter.delete("/delete", auth, removeCart);
cartRouter.post("/get", auth, getCartData);

export default cartRouter;
