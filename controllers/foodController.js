import Food from "../models/foodModel.js";
import catchAsync from "../utils/catchAsync.js";
import fs from "fs";

// adding food item
const addFood = catchAsync(async (req, res) => {
  let imageFilename = `${req.file.filename}`;

  const { name, description, price, category } = req.body;
  const newfood = await Food.create({
    name,
    description,
    price,
    category,
    image: imageFilename,
  });

  res.status(201).json({
    status: "success",
    message: " Item added !",
    data: newfood,
  });
});

// All food list
const listAllFood = catchAsync(async (req, res) => {
  const foods = await Food.find({});

  res.status(200).json({
    status: "success",
    total: foods.length,
    data: foods,
  });
});

// Delete Food item

const deleteFood = catchAsync(async (req, res) => {
  const deleteFood = await Food.findByIdAndDelete(req.params.id);

  fs.unlink(`uploads/${deleteFood.image}`, () => {});

  res.status(204).json({
    status: "success",
    message: "Item deleted!",
    data: null,
  });
});

export { addFood, listAllFood, deleteFood };
