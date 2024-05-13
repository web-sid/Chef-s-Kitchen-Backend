import express from "express";
import {
  addFood,
  deleteFood,
  listAllFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage
const multerStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: multerStorage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listAllFood);
foodRouter.route("/delete/:id").delete(deleteFood);

export default foodRouter;
