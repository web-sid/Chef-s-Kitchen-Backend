import express from "express";
import {
  listOrders,
  orderStatus,
  placeOrder,
  userorders,
  verifyPayment,
} from "../controllers/orderController.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/verify", verifyPayment);
orderRouter.post("/userorders", auth, userorders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", orderStatus);

export default orderRouter;
