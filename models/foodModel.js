import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item must have a name"],
  },
  description: {
    type: String,
    required: [true, "There must be a description"],
  },
  price: {
    type: Number,
    required: [true, " Price must be mentioned"],
  },
  image: {
    type: String,
    required: [true, "Image must be provided"],
  },
  category: {
    type: String,
    required: [true, "Category must be specified  "],
  },
});

const Food = mongoose.model("food", foodSchema);

export default Food;
