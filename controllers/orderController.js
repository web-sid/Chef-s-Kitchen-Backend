import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order
const placeOrder = catchAsync(async (req, res) => {
  const frontendUrl = "https://chefs-kitchen-restaurant.netlify.app/";
  const { userId, items, amount, address } = req.body;

  const newOrder = await Order.create({
    userId,
    items,
    amount,
    address,
  });

  //clearing cart data
  await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

  const line_items = req.body.items.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 80,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: 2 * 80,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
  });

  res.status(200).json({
    success: true,
    session_url: session.url,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const { success, orderId } = req.body;

  if (success === "true") {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    res.status(200).json({
      success: true,
      message: "Paid",
    });
  } else {
    await Order.findByIdAndDelete(orderId);
    res.status(404).json({
      success: false,
      message: "Not Paid",
    });
  }
});

const userorders = catchAsync(async (req, res) => {
  const orders = await Order.find({ userId: req.body.userId });

  res.status(201).json({
    success: true,
    data: orders,
  });
});

// all user orders for admin panel
const listOrders = catchAsync(async (req, res) => {
  const orders = await Order.find({});

  res.status(200).json({
    success: true,
    total: orders.length,
    data: orders,
  });
});

// updating order status
const orderStatus = catchAsync(async (req, res) => {
  await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });

  res.json({
    success: true,
    message: "Status Updated",
  });
});

export { placeOrder, verifyPayment, userorders, listOrders, orderStatus };
