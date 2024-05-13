import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide user id"],
  },
  items: {
    type: Array,
    required: true,
  },

  amount: {
    type: Number,
    required: [true],
  },
  address: {
    type: Object,
    require: true,
  },
  status: {
    type: String,
    default: "Food Processing",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("order", orderSchema);

export default Order;
