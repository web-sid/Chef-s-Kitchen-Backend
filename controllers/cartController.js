import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";

// add items to cart
const addCart = catchAsync(async (req, res) => {
  let userData = await User.findOne({ _id: req.body.userId });
  let cartData = await userData.cartData;

  if (!cartData[req.body.itemId]) {
    cartData[req.body.itemId] = 1;
  } else {
    cartData[req.body.itemId] += 1;
  }

  await User.findByIdAndUpdate(req.body.userId, { cartData });

  res.status(201).json({
    status: "success",
    message: "Added to Cart",
  });
});

// remove from cart
const removeCart = catchAsync(async (req, res) => {
  let user = await User.findById(req.body.userId);
  let cartData = await user.cartData;

  if (cartData[req.body.itemId] > 0) {
    cartData[req.body.itemId] -= 1;
  }

  await User.findByIdAndUpdate(req.body.userId, { cartData });

  res.json({
    status: "success",
    message: "Removed from cart",
  });
});

// Fetch user cart data
const getCartData = catchAsync(async (req, res) => {
  let user = await User.findById(req.body.userId);
  let cartData = await user.cartData;

  res.json({
    status: "success",
    cartData,
  });
});

export { addCart, removeCart, getCartData };
